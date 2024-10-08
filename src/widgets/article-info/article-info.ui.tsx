import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Chip, Tooltip } from '@mui/material'
import { articleTypes } from '~entities/article'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { useTranslation } from 'react-i18next'
import { getCookie } from 'typescript-cookie'

const savedLanguage = getCookie('language')

dayjs.locale(savedLanguage)

type ArticleInfoProps = { article: articleTypes.Article }

export function ArticleInfo(props: ArticleInfoProps) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col-reverse gap-3 py-4">
      <div>
        <div className="flex items-center gap-3">
          <p className="text-pc-400 text-sm ">
            {dayjs(props.article.created).format('DD.MM.YYYY').toUpperCase()}
          </p>
          <div className="flex gap-3">
            <p className="text-pc-400 flex items-center gap-1 text-sm">
              <VisibilityIcon className="w-5" />
              {props.article.viewCount}
            </p>
            <Tooltip title={t('read_time')}>
              <p className="text-pc-400 flex items-center gap-1 text-sm">
                <AccessTimeFilledIcon className="w-4" />
                {props.article.readTime} {t('minute')}
              </p>
            </Tooltip>
          </div>
        </div>

        <div className="flex gap-1 my-3">
          {props.article.categories.map((category, index) => (
            <Chip
              key={index}
              label={category}
              size="small"
              variant="outlined"
              className="text-second-100 border-second-100 font-medium  rounded"
            />
          ))}
        </div>
        <h1 className="block max-w-[100%] break-words my-2 text-[40px] font-bold leading-9">
          {props.article.title}
        </h1>
      </div>

      <img
        className="min-h-[300px] max-h-[320px] min-w-[55%] max-w[55%] object-cover rounded"
        src={props.article.photo}
        alt=""
      />
    </div>
  )
}
