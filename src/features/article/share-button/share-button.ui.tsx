import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import TelegramIcon from '@mui/icons-material/Telegram';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslation } from 'react-i18next';

type ShareButtonProps = {
  id: number;
};

export function ShareButton(props: ShareButtonProps) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const articlePath = `https://ittipak/article/${props.id}`;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(articlePath)
      .then(() => {
        toast.success(t('copyLinkSuccess'));
        setAnchorEl(null);
      })
      .catch((error) => {
        console.error('Ошибка при копировании пути: ', error);
        toast.error(t('copyLinkError'));
      });
  };

  const handleShareClick = (socialMedia: string) => {
    let shareLink: string;
    if (socialMedia === 'telegram') {
      shareLink = `https://t.me/share/url?url=${encodeURIComponent(
        articlePath
      )}`;
    } else if (socialMedia === 'whatsapp') {
      shareLink = `https://wa.me/?text=${encodeURIComponent(articlePath)}`;
    }
    setAnchorEl(null);
    window.open(shareLink, '_blank');
  };

  return (
    <>
      <Tooltip title={t('share')}>
        <IconButton
          aria-label={t('share')}
          onClick={handleClick}
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <ShareIcon className='hover:text-second-100' />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Box className="font-bold">
          <MenuItem onClick={handleCopyLink}>
            <ListItemIcon>
              <InsertLinkIcon fontSize="small" />
            </ListItemIcon>
            {t('copyLink')}
          </MenuItem>
          <MenuItem onClick={() => handleShareClick('telegram')}>
            <ListItemIcon>
              <TelegramIcon fontSize="small" color="primary" />
            </ListItemIcon>
            {t('sendTelegram')}
          </MenuItem>
          <MenuItem
            onClick={() => handleShareClick('whatsapp')}
            className="text-xs"
          >
            <ListItemIcon>
              <WhatsAppIcon fontSize="small" color="success" />
            </ListItemIcon>
            {t('sendWhatsApp')}
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
}
