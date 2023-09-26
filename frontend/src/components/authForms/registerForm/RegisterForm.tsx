import { useTranslation } from "react-i18next"
import { useForm } from "../../../hooks/useForm"
import { emptyRegisterData } from "../../../shared/auth"
import { RegisterData } from "../../../types/auth"

const RegisterForm: React.FC = () => {
  const { t } = useTranslation()
  const {
    data,
    handleFillForm,
    checkFormErrors,
    selectClass,
    hasMissingFields,
    missingFields,
    invalidFieldErrorMessage,
  } = useForm<RegisterData>(emptyRegisterData)

  const handleRegister = () => {
    checkFormErrors<RegisterData>(data)
  }

  return (
    <div>
      <label>
        {t("auth.name")}
        <input
          onChange={(e) => handleFillForm("name", e.target.value)}
          type="text"
          className={selectClass("name")}
        />
      </label>
      <label>
        {t("auth.surname")}
        <input
          onChange={(e) => handleFillForm("surname", e.target.value)}
          type="text"
          className={selectClass("surname")}
        />
      </label>
      <label>
        {t("auth.email")}
        <input
          onChange={(e) => handleFillForm("email", e.target.value)}
          type="text"
          className={selectClass("email")}
        />
      </label>
      <label>
        {t("auth.password")}
        <input
          onChange={(e) => handleFillForm("password", e.target.value)}
          type="password"
          className={selectClass("password")}
        />
      </label>
      <fieldset className="fieldset">
        {hasMissingFields() &&
          missingFields.map((field) => (
            <label key={field} className="fielset-sublabel">
              {invalidFieldErrorMessage(field)}
            </label>
          ))}
      </fieldset>
      <button onClick={handleRegister}>{t("auth.register")}</button>
    </div>
  )
}

export default RegisterForm
