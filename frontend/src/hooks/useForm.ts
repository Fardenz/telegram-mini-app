import { useState } from "react"
import { useTranslation } from "react-i18next"
import { AuthFieldsErrors, LoginData, RegisterData } from "../types/auth"

export const useForm = <T>(emptyData: T) => {
  const { t } = useTranslation()
  const [data, setData] = useState<T>(emptyData)
  const [missingFields, setMissingFields] = useState<Array<string>>([])

  const AUTH_ERRORS_LIST: AuthFieldsErrors = {
    name: t("auth.error.name"),
    surname: t("auth.error.surname"),
    email: t("auth.error.email"),
    password: t("auth.error.password"),
  }

  const handleFillForm = (key: string, value: string): void => {
    setData({
      ...data,
      [key]: value,
    })
  }

  const checkFormErrors = <T extends RegisterData | LoginData>(fields: T): void => {
    const emptyMissingFields: Array<string> = []

    Object.entries(fields).forEach(([key, value]) => {
      if (value == "") emptyMissingFields.push(key)
    })

    setMissingFields(emptyMissingFields)
  }

  const selectClass = (key: string): string => {
    let result: string = "fieldset-input"
    if (hasError(key)) result += "-error"
    return result
  }

  const hasError = (key: string): boolean => {
    return missingFields.some((field) => field == key)
  }

  const hasMissingFields = (): boolean => {
    return missingFields.length > 0
  }

  const invalidFieldErrorMessage = (field: string): string => {
    return AUTH_ERRORS_LIST[field as keyof AuthFieldsErrors]
  }

  return {
    checkFormErrors,
    selectClass,
    hasMissingFields,
    missingFields,
    invalidFieldErrorMessage,
    data,
    handleFillForm,
  }
}
