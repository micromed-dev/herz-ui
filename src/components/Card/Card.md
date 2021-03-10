The Card component is a basic variation of the Paper, with a title and actions on the footer.

### Basic Example
```jsx
<Card
  title="Capture interval"
  actions={[
    {
      label: "Change interval",
      onClick: () => alert('change interval')
    },
  ]}>
  Capturing every hour
</Card>
```
