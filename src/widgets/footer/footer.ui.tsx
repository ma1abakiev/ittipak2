import { Paper } from '@mui/material'

import InstagramIcon from '@mui/icons-material/Instagram'
import EmailIcon from '@mui/icons-material/Email'
import TelegramIcon from '@mui/icons-material/Telegram'

export function Footer() {
  return (
    <Paper elevation={20} className="bg-white    ">
      <div className="py-6 flex justify-between  container">
        <div>
          <p className="font-bold text-black">
            {new Date().getFullYear()} Ittipak
          </p>
          <p className="text-sm font-semibold text-black">
            © Legacy by Usta Soft
          </p>
        </div>
        <ul className="flex gap-5">
          <li>
            <a target="_blank" href="https://www.instagram.com/ramz1k03/?hl=ru">
              <InstagramIcon className=" hover:text-uygur transition-all" />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://mail.google.com/mail/u/0/#inbox">
              <EmailIcon className="hover:text-uygur transition-all" />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://web.telegram.org/a/">
              <TelegramIcon className="hover:text-uygur transition-all" />
            </a>
          </li>
        </ul>
      </div>
    </Paper>
  )
}
