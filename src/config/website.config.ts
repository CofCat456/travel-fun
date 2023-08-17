import Logo from '../assets/logo.svg';
import LogoImage from '../assets/logoImg.svg';
import DarkLogoImage from '../assets/logoImg_dark.svg';
import UserImage from '../assets/user.jpg';

interface Socia {
  icon: string
  href: string
}

interface WebsiteConfig {
  title: string
  username: string
  userImage: string
  logo: string
  logoImage: string
  darkLogoImage: string
  socia: Socia[]
}

export const websiteConfig: WebsiteConfig = Object.freeze({
  title: 'Travel Fun',
  username: 'CofCat',
  userImage: UserImage,
  logo: Logo,
  logoImage: LogoImage,
  darkLogoImage: DarkLogoImage,
  socia: [
    {
      icon: 'github',
      href: 'https://github.com/CofCat456',
    },
    {
      icon: 'mail',
      href: 'mailto:a25690756@gmail.com',
    },
    {
      icon: 'public',
      href: 'https://www.cofcat.com/',
    },
  ],
});
