import { Theme, useTheme } from '@mui/material/styles'
import Chip from '@mui/material/Chip'
import { useTranslation } from 'react-i18next'

// const statusData = {
//   draft: { value: 'draft', title: 'Черновик', color: '#f6a914' },
//   pending: { value: 'pending', title: 'Проверка', color: '#3e9dd8' },
//   rejected: { value: 'rejected', title: 'Отклонено', color: '#ea4f44' },
//   approved: { value: 'approved', title: 'Публиковано', color: '#2a9d99' },
// };

function getStyles(color: string, theme: Theme) {
  return {
    backgroundColor: color,
    fontWeight: theme.typography.fontWeightMedium,
  }
}

interface StatusMenuProps {
  initialStatus: string
}

export function StatusMenu({ initialStatus }: StatusMenuProps) {
  const { t } = useTranslation()
  const statusData = {
    draft: { value: 'draft', title: t('draft_status'), color: '#ea4f44' },
    archived: {
      value: 'archived',
      title: t('archived_status'),
      color: '#3e9dd8',
    },
    // rejected: { value: 'rejected', title: 'Отклонено', color: '#ea4f44' },
    published: {
      value: 'published',
      title: t('published_status'),
      color: '#2a9d99',
    },
  }
  const theme = useTheme()
  return (
    <div>
      <Chip
        size="small"
        className="rounded text-[white]"
        label={statusData[initialStatus].title}
        style={getStyles(statusData[initialStatus].color, theme)}
      />
    </div>
  )
}
