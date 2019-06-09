import { Component, OnInit } from '@angular/core'
import { ActionSheetController, Platform } from '@ionic/angular'
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx'
import { File } from '@ionic-native/file/ngx'
import { FilePath } from '@ionic-native/file-path/ngx'
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx'
import { ToastService } from 'src/app/services/toast.service'
import { LoadingService } from 'src/app/services/loading.service'

declare var cordova: any // 导入第三方的库定义到 TS 项目中

@Component({
  selector: 'app-change-avatar',
  templateUrl: './change-avatar.page.html',
  styleUrls: ['./change-avatar.page.scss']
})
export class ChangeAvatarPage implements OnInit {
  lastImage = ''
  base64
  imageUrl

  constructor(
    public actionSheetController: ActionSheetController,
    private camera: Camera,
    public file: File,
    public filePath: FilePath,
    private transfer: FileTransfer,
    public platform: Platform,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {}

  showActionSheet() {
    this.presentActionSheet()
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '选择图片',
      buttons: [
        {
          text: '从相册选择',
          icon: 'images',
          handler: () => {
            console.log('from picture library')
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY)
          }
        },
        {
          text: '拍照',
          icon: 'camera',
          handler: () => {
            console.log('from camera')
            this.takePicture(this.camera.PictureSourceType.CAMERA)
          }
        },
        {
          text: '取消',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel')
          }
        }
      ]
    })
    await actionSheet.present()
  }

  takePicture(sourceType: PictureSourceType) {
    const options: CameraOptions = {
      quality: 5,
      destinationType: this.camera.DestinationType.NATIVE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }

    this.camera.getPicture(options).then(
      imagePath => {
        console.log('TCL: ChangeAvatarPage -> takePicture -> imagePath', imagePath)
        this.lastImage = imagePath
      },
      err => {
        console.log('TCL: ChangeAvatarPage -> takePicture -> err', err)
        this.toastService.showToast({
          message: '选择图片出现错误，请在 App 中操作或检查相关权限。'
        })
      }
    )
  }

  // 将获取到的图片或者相机拍摄到的图片进行一下另存为，用于后期的图片上传使用
  copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log('TCL: ChangeAvatarPage -> copyFileToLocalDir -> cordova', cordova)

    this.file.copyFile(namePath, currentName, cordova.file.externalDataDirectory, newFileName).then(
      success => {
        console.log('TCL: ChangeAvatarPage -> copyFileToLocalDir -> success', success)
        this.lastImage = newFileName
      },
      error => {
        console.log('TCL: ChangeAvatarPage -> copyFileToLocalDir -> error', error)
        this.toastService.showToast({
          message: '存储图片到本地图库出现错误。'
        })
      }
    )
  }

  // 为文件生成一个新的文件名
  createFileName() {
    const d = new Date()
    const n = d.getTime()
    const newFileName = n + '.jpg' // 拼接文件名

    return newFileName
  }

  // 处理图片的路径为可以上传的路径
  public pathForImage(img) {
    if (img === null) {
      return ''
    } else {
      console.log(
        'TCL: ChangeAvatarPage -> pathForImage -> cordova.file.externalDataDirectory + img',
        cordova.file.externalDataDirectory + img
      )

      return cordova.file.externalDataDirectory + img
    }
  }

  uploadImage() {
    const url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface'
    const targetPath = this.pathForImage(this.lastImage)
    const filename = 'test_image_name' + Date.now() + '.jpg' // 定义上传后的文件名

    // fileTransfer 上传的参数
    const options = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { fileName: filename }
    }

    const fileTransfer: FileTransferObject = this.transfer.create()

    const loading = this.loadingService.showLoading({
      message: '上传中...'
    })

    // 开始正式地上传
    fileTransfer.upload(targetPath, url, options).then(
      data => {
        loading.then(loadingRef => {
          loadingRef.dismiss()
        })

        this.toastService.showToast({
          message: '图片上传成功。',
          duration: 2000
        })
      },
      err => {
        loading.then(loadingRef => {
          loadingRef.dismiss()
        })

        this.toastService.showToast({
          message: '图片上传发生错误，请重试。'
        })
      }
    )
  }
}
