import { useTranslation } from 'react-i18next'

export const AboutUsPage = () => {
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-8 text-center text-blue-600">
        {t('aboutUs.title')}
      </h1>
      <p className="mb-6 text-lg text-gray-800 leading-relaxed">
        {t('aboutUs.introduction')}
      </p>

      <p className="mb-6 text-lg text-gray-800 leading-relaxed">
        <strong>{t('aboutUs.projectName')}</strong> {t('aboutUs.description')}
      </p>

      <h2 className="text-4xl font-semibold mb-6 text-blue-600 text-center">
        {t('aboutUs.supportTitle')}
      </h2>
      <p className="mb-4 text-lg text-gray-800 leading-relaxed">
        {t('aboutUs.supportIntro')}
      </p>

      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8 shadow-inner">
        <p className="font-bold mb-4 text-blue-700">{t('aboutUs.supportDetailsTitle')}</p>
        <ul className="list-none pl-0 text-gray-800">
          <li className="mb-4">
            <strong>{t('aboutUs.bank')}:</strong> {t('aboutUs.bankName')}
          </li>
          <li className="mb-4">
            <strong>{t('aboutUs.accountNumber')}:</strong> {t('aboutUs.accountNumberValue')}
          </li>
          <li>
            <strong>{t('aboutUs.recipient')}:</strong> {t('aboutUs.recipientName')}
          </li>
        </ul>
      </div>

      <p className="mb-8 text-lg text-gray-800 leading-relaxed">
        {t('aboutUs.thankYou')}
      </p>

      <p className="text-lg text-gray-800 text-center">
        {t('aboutUs.signOff')}
      </p>
    </div>
  )
}
