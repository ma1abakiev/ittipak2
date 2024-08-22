import { IconButton, Tooltip } from '@mui/material'
import ArchiveIcon from '@mui/icons-material/Archive'
import { articleQueries } from '~entities/article'
import { useTranslation } from 'react-i18next'

interface IDeleteButton {
  id: number
}

export function ArchiveButton({ id, status }: IDeleteButton) {
  const { mutate: archivedArticle } = articleQueries.useArchivedArticleQuery(
    id,
    status
  )

  const handleArchived = async () => {
    await archivedArticle()
  }
  const { t } = useTranslation()

  return (
    <Tooltip title={t('archive_btn')}>
      <IconButton onClick={handleArchived}>
        <ArchiveIcon className="hover:text-[#ff7c5b]" />
      </IconButton>
    </Tooltip>
  )
}
