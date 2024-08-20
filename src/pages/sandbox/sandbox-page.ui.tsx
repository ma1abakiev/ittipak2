import { useEffect, useState } from 'react'
import { CreateArticle } from '~widgets/create-article'
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Box,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { userQueries } from '~entities/user'
import { pathKeys } from '~shared/lib/react-router'
import { useNavigate } from 'react-router-dom'
import { articleQueries } from '~entities/article'
import { withErrorBoundary } from 'react-error-boundary'
import { URLtoFile, calculateReadingTime } from '~shared/utils/editor'
import { CoverCropper } from '~features/editor/cover-cropper'
import { ErrorHandler } from '~shared/ui/error'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface StepperViewProps {
  activeStep: number
}

const steps = [
  'step_create_article',
  'step_publish_article'
]

function Page() {
  const { t } = useTranslation()
  const { data: userData, isLoading } = userQueries.useLoginUserQuery()
  const role = userData?.data?.role
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && role !== 'writer') {
      navigate(pathKeys.home())
    }
  }, [isLoading, role, navigate])

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const { mutate: createArticle, isPending } =
    articleQueries.useCreateArticleMutation()

  const [title, setTitle] = useState('')

  const handleSubmit = async () => {
    try {
      const blocksString = localStorage.getItem('sandboxContent')
      const blocks = blocksString ? JSON.parse(blocksString) : []

      let firstParagraphText = ''
      for (const block of blocks) {
        if (
          block.type === 'paragraph' &&
          block.content &&
          block.content.length > 0 &&
          block.content[0].text
        ) {
          firstParagraphText = block.content[0].text
          break
        }
      }

      const trimmedSubtitle = firstParagraphText.substring(0, 100).toString()
      const trimmedTitle = title.substring(0, 50).toString()

      const imageBlob = localStorage.getItem('savedImage')
      const file = await URLtoFile(imageBlob, imageBlob)
      const formData = new FormData()
      formData.append('photo', file)
      formData.append('title', trimmedTitle)
      formData.append('subtitle', trimmedSubtitle)
      formData.append('body', JSON.stringify(blocks))
      formData.append('language', language)
      formData.append('readTime', calculateReadingTime(blocks).toString())
      await createArticle(formData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }

  const [language, setLanguage] = useState('')

  const handleLanguage = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string)
  }

  return (
    <div className="my-20">
      <div className="min-h-[700px] container">
        <StepperView activeStep={activeStep} />
        {activeStep === 0 && (
          <div className="w-full my-5 flex flex-col bg-[white] border border-sc-100 p-5 rounded">
            <div className="w-full px-[20px] mb-5">
              <input
                className="w-full font-bold mb-3 text-[32px] text-pc-500 resize-none leading-8 outline-none max-h-[300px]"
                placeholder={t('title_placeholder')}
                value={title}
                onChange={handleChangeTitle}
              />
              <CreateArticle />
            </div>
            <Button
              className="self-end"
              variant="contained"
              onClick={handleNext}
            >
              {t('button_next')}
            </Button>
          </div>
        )}
        {activeStep === 1 && (
          <div className="w-full my-5 flex flex-col bg-[white] border border-sc-100 p-5 rounded">
            <h3 className="text-xl font-bold text-center">{t('publish_heading')}</h3>
            <h4>{t('select_language')}</h4>
            <Box width={400}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{t('language')}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  label={t('language')}
                  onChange={handleLanguage}
                >
                  <MenuItem value={'ru'}>{t('language_ru')}</MenuItem>
                  <MenuItem value={'en'}>{t('language_en')}</MenuItem>
                  <MenuItem value={'ug'}>{t('language_ug')}</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <h4 className="text-lg font-medium mt-3">
              {t('upload_cover')}
            </h4>
            <CoverCropper update={false} />

            <div className="mt-4 flex justify-between">
              <Button variant="contained" onClick={handleBack}>
                {t('button_back')}
              </Button>
              {isPending ? (
                <Button variant="outlined" className="cursor-wait flex gap-2">
                  <CircularProgress size={20} />
                  {t('sending_data')}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleSubmit}>
                  {t('button_finish')}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const StepperView: React.FC<StepperViewProps> = ({ activeStep }) => {
  const { t } = useTranslation()
  return (
    <Stepper
      className="bg-[white] p-3 border border-sc-100 rounded"
      activeStep={activeStep}
    >
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{t(label)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export const SandboxPage = withErrorBoundary(Page, {
  fallbackRender: ({ error }) => <ErrorHandler error={error} />,
})
