# figma-ui-kit

React + TypeScript + Tailwind component library built from **Figma Components-2**.

## Components
- **Button** — 7 hierarchies, 5 sizes, 3 icon modes (default, dot-leading, icon-only)
- **Toggle** — 2 types (default/slim), 2 sizes, controlled + uncontrolled, label + supporting text  
- **InputField** — 6 variants, 2 sizes, destructive state, label, hint text, icons

---

## Setup in Cursor

Open the project folder in Cursor, then run in the terminal:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the component showcase.

---

## Usage

```tsx
import { Button, Toggle, InputField } from "./components";

// Button
<Button hierarchy="primary" size="md">Save changes</Button>
<Button hierarchy="secondary-gray" leadingIcon={<PlusIcon />}>Add item</Button>
<Button icon="dot-leading" hierarchy="secondary-color">In progress</Button>
<Button icon="icon-only" hierarchy="primary" ariaLabel="Add"><PlusIcon /></Button>

// Toggle
<Toggle label="Notifications" supportingText="Get email updates." defaultChecked />

// Controlled toggle
const [on, setOn] = useState(false);
<Toggle checked={on} onCheckedChange={setOn} label="Dark mode" />

// InputField
<InputField label="Email" placeholder="you@example.com" required helpIcon />
<InputField label="Search" variant="icon-leading" leadingIcon={<SearchIcon />} />
<InputField label="Password" destructive hintText="Incorrect password." />
```

---

## Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial UI kit from Figma Components-2"
git remote add origin https://github.com/YOUR-USERNAME/figma-ui-kit.git
git push -u origin main
```
