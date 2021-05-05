/** @jsxRuntime classic /
/** @jsx jsx */
import { HerzUITheme, jsx } from "theme-ui"
import {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  useMemo,
  useState,
} from "react"
import Icon, { IconProps } from "../Icon/Icon"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Input type */
  type?: HTMLInputElement["type"]
  /** The value of the `input` element, required for a controlled component */
  value?: string
  /** Callback fired when the value is changed */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** Callback fired when the input is unfocused */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  /** Placeholder text content */
  placeholder?: string

  /** Controls which state the input will be displayed in */
  state?: "default" | "error" | "success"
  /** If `true`, the `input` element will be disabled */
  disabled?: boolean
  /** If `true`, the `input` is required */
  required?: boolean

  /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
  id?: string
  /** Text at the end of the input */
  unit?: string
  /** Name of the icon to be placed at the end of the input */
  iconName?: IconProps["name"]
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    type = "text",
    value,
    onChange,
    onBlur,
    placeholder,
    disabled = false,
    state = "default",
    required = false,
    iconName,
    unit,
    ...htmlProps
  }: InputProps,
  ref
) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const inputType = useMemo(() => {
    if (type === "password") {
      return passwordVisible ? "text" : "password"
    }
    return type
  }, [passwordVisible, type])

  return (
    <div
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: 2,

        paddingY: "6px", // the 2px border counts towards height, so we need 6px instead of 8px for the correct height
        paddingX: 3,
        ...{
          default: {
            backgroundColor: value ? "secondary.alpha.90" : "text.alpha.95",
          },
          success: {
            backgroundColor: "success.alpha.95",
          },
          error: {
            backgroundColor: "primary.alpha.95",
          },
        }[state],
        outline: 0,
        borderRadius: 2,
        border: "2px solid transparent",

        transition: "all 0.2s",
        "&:hover": {
          ...(state === "default" && {
            backgroundColor: value ? "secondary.alpha.85" : "text.alpha.90",
          }),
        },
        ...{
          default: {},
          success: {
            borderColor: "success.0",
          },
          error: {
            borderColor: "primary.0",
          },
        }[state],
        "&:focus-within": {
          borderColor: "secondary.0",
          boxShadow: (theme: HerzUITheme) =>
            `0px 0px 0px 4px ${theme.colors.secondary.alpha[90]}`,
          backgroundColor: "#FFF",
        },
      }}
    >
      <input
        id={id}
        type={inputType}
        ref={ref}
        required={required}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={state === "error"}
        size={1} // Input has a default size property of 20, which limits it's minimum width. Setting it to 1 and handling width through the parent so that we can control the input width better.
        {...htmlProps}
        sx={{
          width: "100%",
          flexGrow: 1,
          outline: 0,
          backgroundColor: "transparent",
          border: "none",
          p: 0,
          color: "text.0",
          variant: "text.body1",

          // removes background color when input was filled with autofill in chromium
          "&:-webkit-autofill": {
            WebkitBackgroundClip: "text",
          },
        }}
      />

      {unit && (
        <label
          htmlFor={id}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "text.40",
          }}
        >
          {unit}
        </label>
      )}
      {iconName && <Icon name={iconName} size={16} sx={{ color: "text.40" }} />}
      {type === "password" && (
        <div
          onClick={() => setPasswordVisible((value) => !value)}
          sx={{
            display: "flex",
            color: passwordVisible ? "secondary.0" : "text.40",
            cursor: "pointer",
          }}
        >
          <Icon name={passwordVisible ? "IconEye" : "IconEyeOff"} size={16} />
        </div>
      )}
    </div>
  )
})

export default Input
