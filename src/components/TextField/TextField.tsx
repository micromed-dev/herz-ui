/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from "theme-ui"
import { ChangeEvent, forwardRef } from "react"
import Input, { InputProps } from "../Input/Input"
import Selector, { SelectorProps } from "../Selector/Selector"

export interface TextFieldProps {
  /** Input type */
  type?: HTMLInputElement["type"]
  /** The label content */
  label?: string
  /** The value of the `input` element, required for a controlled component */
  value?: string
  /** Callback fired when the value is changed */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /** Placeholder text content */
  placeholder?: string

  /** The helper text content */
  helperText?: string
  /** Controls which state the `input` will be displayed in */
  state?: "default" | "error" | "success"
  /** If `true`, the `input` element will be disabled */
  disabled?: boolean
  /** If `true`, the `input` is required */
  required?: boolean

  /** Text to show after label if field is required */
  requiredText?: string
  /** Text to show after label if field is not required (optional) */
  optionalText?: string

  /** The id of the `input` element. Use this prop to make label and `helperText` accessible for screen readers */
  id?: string
  /** Text at the end of the input */
  unit?: string

  iconName?: InputProps["iconName"]

  /** Will render a Select instead of an Input if `true` */
  select?: boolean
  /** Props passed to the Select component when `select` is `true` */
  selectProps?: Omit<SelectorProps, "fullWidth" | "hightlightFilled">
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      id,
      type = "text",
      value,
      onChange,
      label,
      placeholder,
      disabled = false,
      state = "default",
      helperText,
      required = false,
      requiredText = "required",
      optionalText = "optional",
      iconName,
      unit,
      select = false,
      selectProps,
    }: TextFieldProps,
    ref
  ) {
    const helperTextId = helperText && id ? `${id}-helper-text` : undefined
    const inputLabelId = label && id ? `${id}-label` : undefined

    return (
      <div sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {label && (
          <div sx={{ display: "flex", gap: 1 }}>
            <label
              htmlFor={id}
              id={inputLabelId}
              sx={{
                color: "text.0",
                variant: "text.body1",
              }}
            >
              {label}
            </label>
            <span
              sx={{
                color: "text.40",
                variant: "text.body2",
              }}
            >
              ({required ? requiredText : optionalText})
            </span>
          </div>
        )}

        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: 2,

            ...{
              default: {},
              success: {
                backgroundColor: "success.alpha.95",
              },
              error: {
                backgroundColor: "primary.alpha.95",
              },
            }[state],
          }}
        >
          {select ? (
            <Selector
              id={id}
              placeholder={placeholder}
              {...selectProps}
              options={selectProps?.options ?? []}
              fullWidth={true}
              hightlightFilled={false}
            />
          ) : (
            <Input
              id={id}
              type={type}
              ref={ref}
              placeholder={placeholder}
              iconName={iconName}
              value={value}
              disabled={disabled}
              onChange={onChange}
              state={state}
              unit={unit}
              aria-describedby={helperTextId}
            />
          )}
          {helperText && (
            <span
              id={helperTextId}
              sx={{
                ...{
                  default: {
                    color: "text.40",
                    variant: "text.body2",
                  },
                  success: {
                    px: 3,
                    pb: 2,
                    color: "success.0",
                    variant: "text.body1",
                  },
                  error: {
                    px: 3,
                    pb: 2,
                    color: "primary.0",
                    variant: "text.body1",
                  },
                }[state],
              }}
            >
              {helperText}
            </span>
          )}
        </div>
      </div>
    )
  }
)

export default TextField
