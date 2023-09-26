import React from "react"
import { vi } from "vitest"
import LoginForm from "../../../src/components/authForms/loginForm/LoginForm"
import { fireEvent, render, screen } from "@testing-library/react"
import AuthFixture from "../../fixtures/auth"

vi.mock("i18next", () => ({
  t: vi.fn().mockImplementation((key) => key),
}))

describe("LoginForm", () => {
  it("show password error when validate is incorrect", () => {
    SUT.render()

    SUT.fillInput("auth.email", AuthFixture.anEmail)
    SUT.clickButton()

    expect(SUT.errorMessage("auth.error.password")).toBeInTheDocument()
  })

  it("show email error when validate is incorrect", () => {
    SUT.render()

    SUT.fillInput("auth.password", AuthFixture.aPassword)
    SUT.clickButton()

    expect(SUT.errorMessage("auth.error.email")).toBeInTheDocument()
  })

  it("show both errors when validate is incorrect", () => {
    SUT.render()

    SUT.clickButton()

    expect(SUT.errorMessage("auth.error.email")).toBeInTheDocument()
    expect(SUT.errorMessage("auth.error.password")).toBeInTheDocument()
  })
})

class SUT {
  static render(): void {
    render(<LoginForm />)
  }

  static input(label: string): HTMLElement {
    return screen.getByLabelText(label)
  }

  static fillInput(label: string, value: string): void {
    fireEvent.change(SUT.input(label), { target: { value: value } })
  }

  static button(): HTMLElement {
    return screen.getByRole("button", { name: "auth.login" })
  }

  static clickButton(): void {
    fireEvent.click(SUT.button())
  }

  static errorMessage(message: string): HTMLElement {
    return screen.getByText(message)
  }
}
