import { emptyLoginData } from "../../../shared/auth"
import { useTranslation } from "react-i18next"
import { LoginData } from "../../../types/auth"
import { useForm } from "../../../hooks/useForm"
import { useAuthContext } from "../../../cotexts/authContext"
import "./loginForm.scss"

const LoginForm: React.FC = () => {
  const { t } = useTranslation()
  const { login } = useAuthContext()

  const {
    data,
    handleFillForm,
    checkFormErrors,
    selectClass,
    hasMissingFields,
    missingFields,
    invalidFieldErrorMessage,
  } = useForm<LoginData>(emptyLoginData)

  const handleLogin = async (): Promise<void> => {
    checkFormErrors(data)
    login(data)
  }

  return (
    <div className="loginform">
      <div className="loginform-image"></div>

      <div className="loginform-content">
        <p className="loginform-content__title">{t("auth.login")}</p>

        <form className="loginform-content__form">
          <fieldset className="fieldset">
            <label className="fieldset-label">
              {t("auth.email")}
              <input
                onChange={(e) => {
                  handleFillForm("email", e.target.value)
                }}
                type="text"
                className={selectClass("email")}
              />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            <label className="fieldset-label">
              {t("auth.password")}
              <input
                onChange={(e) => {
                  handleFillForm("password", e.target.value)
                }}
                type="password"
                className={selectClass("password")}
              />
            </label>
          </fieldset>

          <fieldset className="fieldset">
            {hasMissingFields() &&
              missingFields.map((field) => (
                <label key={field} className="fielset-sublabel">
                  {invalidFieldErrorMessage(field)}
                </label>
              ))}
          </fieldset>

          <button onClick={handleLogin} type="button" className="button">
            {t("auth.login")}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
