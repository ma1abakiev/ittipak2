export const AboutUsPage = () => {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-8 text-center text-blue-600">
        О нас
      </h1>
      <p className="mb-6 text-lg text-gray-800 leading-relaxed">
        Меня зовут Малабакиев Рамзан Камильджанович, я уйгур из Кыргызстана,
        являюсь активным членом Общества уйгуров "Иттипак", также при комитете
        по молодежи и один из участников команды "Usta Soft". Вдохновлённый
        идеей создания платформы для уйгурского сообщества, я вместе с командой
        решил создать новостной сайт Ittipak. Этот проект был разработан мной
        бесплатно и по собственной инициативе, чтобы предоставлять уйгурскому
        народу свежие и актуальные новости.
      </p>

      <p className="mb-6 text-lg text-gray-800 leading-relaxed">
        <strong>Ittipak</strong> - это не просто новостной сайт, это платформа,
        которая объединяет уйгуров, где бы они ни находились. Наша цель -
        предоставить надежные новости, аналитические материалы и освещение
        событий, которые важны для нашей общины. Мы стремимся поддерживать
        культурную идентичность, делиться важной информацией и способствовать
        единению нашего народа. Кроме того, мы активно распространяем информацию
        о богатой истории, культуре, обычаях и традициях уйгурского народа,
        чтобы сохранить и передать это наследие будущим поколениям.
      </p>

      <h2 className="text-4xl font-semibold mb-6 text-blue-600 text-center">
        Поддержка сайта
      </h2>
      <p className="mb-4 text-lg text-gray-800 leading-relaxed">
        Мы рады любому содействию и благодарны за вашу поддержку. Если вы хотите
        помочь нам в развитии сайта Ittipak и поддержать работу команды "Usta
        Soft", вы можете сделать это, перечислив средства на наши реквизиты:
      </p>

      <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8 shadow-inner">
        <p className="font-bold mb-4 text-blue-700">Реквизиты для поддержки:</p>
        <ul className="list-none pl-0 text-gray-800">
          <li className="mb-4">
            <strong>Банк:</strong> «Commercial bank KYRGYZSTAN» OJSC (mBank)
          </li>
          <li className="mb-4">
            <strong>Номер счёта:</strong> 4177 4901 9075 9326 (VISA)
          </li>
          <li>
            <strong>Получатель:</strong> RAMZAN MALABAKIEV
          </li>
        </ul>
      </div>

      <p className="mb-8 text-lg text-gray-800 leading-relaxed">
        Ваш вклад поможет нам продолжать работать над улучшением сайта,
        расширением его возможностей и предоставлением высококачественного
        контента для всех наших пользователей. Спасибо за ваше доверие и
        поддержку!
      </p>

      <p className="text-lg text-gray-800 text-center">
        С уважением,
        <br />
        Малабакиев Рамзан Камильджанович
        <br />и команда "Usta Soft"
      </p>
    </div>
  )
}
