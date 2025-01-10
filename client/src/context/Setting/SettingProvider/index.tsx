import settingApi from '@/apis/modules/setting.api'
import Loader from '@/components/common/Loader'
import { IApiResponse, ISetting, ISettingResponse } from '@/models/interfaces'
import { useEffect, useState } from 'react'
import SettingContext from '../SettingContext'

// Định nghĩa kiểu dữ liệu cho props của SettingProvider
interface SettingProviderProps {
  children: React.ReactNode
}

function SettingProvider({ children }: SettingProviderProps) {
  const [loading, setLoading] = useState<boolean>(true) // Trạng thái loading khi gọi API
  const [setting, setSetting] = useState<ISetting>(Object)
  // Kiểm tra token khi trang được load
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res: IApiResponse<{ setting: ISettingResponse }> = await settingApi.all()
        if (res.status === 200 && res.data) {
          const data = res.data.setting
          setSetting({
            banner: {
              mainBanner: data.mainBanner,
              subBanner1: data.subBanner1,
              subBanner2: data.subBanner2
            },
            slideShow: {
              slideshowBanner1: data.slideshowBanner1,
              slideshowBanner2: data.slideshowBanner2,
              slideshowBanner3: data.slideshowBanner3
            },
            logo: {
              mainLogo: data.mainLogo,
              sloganLogo: data.sloganLogo
            },
            service: {
              serviceTitle1: data.serviceTitle1,
              serviceInfo1: data.serviceInfo1,
              serviceTitle2: data.serviceTitle2,
              serviceInfo2: data.serviceInfo2,
              serviceTitle3: data.serviceTitle3,
              serviceInfo3: data.serviceInfo3,
              serviceTitle4: data.serviceTitle4,
              serviceInfo4: data.serviceInfo4
            },
            address: {
              branchName1: data.branchName1,
              branchAddress1: data.branchAddress1,
              branchName2: data.branchName2,
              branchAddress2: data.branchAddress2
            },
            info: {
              slogan: data.slogan,
              hotline: data.hotline,
              email: data.email,
              description: data.description
            },
            social: {
              facebookLink: data.facebookLink,
              instagramLink: data.instagramLink,
              youtubeLink: data.youtubeLink
            }
          })
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false) // Đặt trạng thái loading về false khi đã kiểm tra xong
      }
    }
    fetchApi()
  }, [])

  if (loading) {
    return <Loader /> // Hiển thị loading trong khi đang kiểm tra token
  }

  return <SettingContext.Provider value={setting}>{children}</SettingContext.Provider>
}

export default SettingProvider
