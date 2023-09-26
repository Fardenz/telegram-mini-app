import React from "react"
import { vi } from "vitest"
import RegisterForm from "../../../src/components/authForms/registerForm/RegisterForm"
import { fireEvent, render, screen } from "@testing-library/react"
import AuthFixture from "../../fixtures/auth"

vi.mock("i18next", () => ({
  t: vi.fn().mockImplementation((key) => key),
}))

describe("ResgisterForm", () => {
  it("show password error when validate is incorrect", () => {
    SUT.render()

    SUT.fillInput("auth.email", AuthFixture.anEmail)
    SUT.fillInput("auth.name", AuthFixture.aName)
    SUT.fillInput("auth.surname", AuthFixture.aSurname)
    SUT.clickButton()

    expect(SUT.errorMessage("auth.error.password")).toBeInTheDocument()
  })

  it("show email error when validate is incorrect", () => {
    SUT.render()

    SUT.fillInput("auth.password", AuthFixture.aPassword)
    SUT.fillInput("auth.name", AuthFixture.aName)
    SUT.fillInput("auth.surname", AuthFixture.aSurname)
    SUT.clickButton()

    expect(SUT.errorMessage("auth.error.email")).toBeInTheDocument()
  })

  it("show name error when validate is incorrect", () => {
    SUT.render()

    SUT.fillInput("auth.email", AuthFixture.anEmail)
    SUT.fillInput("auth.password", AuthFixture.aPassword)
    SUT.fillInput("auth.surname", AuthFixture.aSurname)
    SUT.clickButton()

    expect(SUT.errorMessage("auth.error.name")).toBeInTheDocument()
  })

  it("show surname error when validate is incorrect", () => {
    SUT.render()

    SUT.fillInput("auth.email", AuthFixture.anEmail)
    SUT.fillInput("auth.password", AuthFixture.aPassword)
    SUT.fillInput("auth.name", AuthFixture.aName)
    SUT.clickButton()

    expect(SUT.errorMessage("auth.error.surname")).toBeInTheDocument()
  })

  it("show all errors when validate is incorrect", () => {
    SUT.render()

    SUT.clickButton()

    expect(SUT.errorMessage("auth.error.name")).toBeInTheDocument()
    expect(SUT.errorMessage("auth.error.surname")).toBeInTheDocument()
    expect(SUT.errorMessage("auth.error.email")).toBeInTheDocument()
    expect(SUT.errorMessage("auth.error.password")).toBeInTheDocument()
  })
})

class SUT {
  static render(): void {
    render(<RegisterForm />)
  }

  static input(label: string): HTMLElement {
    return screen.getByLabelText(label)
  }

  static fillInput(label: string, value: string): void {
    fireEvent.change(SUT.input(label), { target: { value: value } })
  }

  static button(): HTMLElement {
    return screen.getByRole("button", { name: "auth.register" })
  }

  static clickButton(): void {
    fireEvent.click(SUT.button())
  }

  static errorMessage(message: string): HTMLElement {
    return screen.getByText(message)
  }
}
