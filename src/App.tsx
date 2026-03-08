import { useState } from "react";
import { Button, Toggle, InputField } from "./components";

// ─── Icons ────────────────────────────────────────────────────────────────────

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" />
  </svg>
);
const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 16l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1.5 6.5l7.5 5 7.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2.5 5h15M6.5 5V3.5a1 1 0 011-1h5a1 1 0 011 1V5m2.5 0l-1 11a1 1 0 01-1 .5H6a1 1 0 01-1-.5L3.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="3" y="8" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 8V5a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Layout helpers ───────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <div className="border-b border-gray-200 pb-3 mb-7">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Row({ label, children, wrap = true }: { label?: string; children: React.ReactNode; wrap?: boolean }) {
  return (
    <div className="mb-6">
      {label && (
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-[0.7px] mb-3">{label}</p>
      )}
      <div className={`flex ${wrap ? "flex-wrap" : ""} items-center gap-3`}>
        {children}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

const TABS = ["Button", "Toggle", "Input Field"] as const;
type Tab = (typeof TABS)[number];

export default function App() {
  const [tab, setTab] = useState<Tab>("Button");

  return (
    <div className="min-h-screen bg-gray-25 font-body">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" fill="white" />
                  <rect x="8" y="1.5" width="4.5" height="4.5" rx="1.5" fill="white" fillOpacity=".6" />
                  <rect x="1.5" y="8" width="4.5" height="4.5" rx="1.5" fill="white" fillOpacity=".6" />
                  <rect x="8" y="8" width="4.5" height="4.5" rx="1.5" fill="white" />
                </svg>
              </div>
              <span className="font-bold text-[15px] text-gray-900">UI Kit</span>
              <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">
                Figma Components-2
              </span>
            </div>
            <span className="text-sm text-gray-400">React · TypeScript · Tailwind</span>
          </div>

          {/* Tabs */}
          <div className="flex -mb-px">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={[
                  "px-5 py-3 text-sm font-medium border-b-2 transition-colors duration-150 cursor-pointer",
                  tab === t
                    ? "text-brand-600 border-brand-600"
                    : "text-gray-500 border-transparent hover:text-gray-700",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-8 py-10">

        {/* ── BUTTON ── */}
        {tab === "Button" && (
          <Section title="Button">
            <Row label="Hierarchy — all 7 variants">
              <Button hierarchy="primary">Primary</Button>
              <Button hierarchy="secondary-color">Secondary color</Button>
              <Button hierarchy="secondary-gray">Secondary gray</Button>
              <Button hierarchy="tertiary-color">Tertiary color</Button>
              <Button hierarchy="tertiary-gray">Tertiary gray</Button>
              <Button hierarchy="link-color">Link color</Button>
              <Button hierarchy="link-gray">Link gray</Button>
            </Row>

            <Row label="Sizes — Primary">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">X-Large</Button>
              <Button size="2xl">2X-Large</Button>
            </Row>

            <Row label="Sizes — Secondary gray">
              <Button hierarchy="secondary-gray" size="sm">Small</Button>
              <Button hierarchy="secondary-gray" size="md">Medium</Button>
              <Button hierarchy="secondary-gray" size="lg">Large</Button>
              <Button hierarchy="secondary-gray" size="xl">X-Large</Button>
              <Button hierarchy="secondary-gray" size="2xl">2X-Large</Button>
            </Row>

            <Row label="With leading icon">
              <Button leadingIcon={<PlusIcon />}>Create new</Button>
              <Button hierarchy="secondary-color" leadingIcon={<PlusIcon />}>Create new</Button>
              <Button hierarchy="secondary-gray" leadingIcon={<PlusIcon />}>Create new</Button>
              <Button hierarchy="tertiary-color" leadingIcon={<PlusIcon />}>Create new</Button>
            </Row>

            <Row label="With trailing icon">
              <Button trailingIcon={<ArrowRight />}>Continue</Button>
              <Button hierarchy="secondary-gray" trailingIcon={<ArrowRight />}>Continue</Button>
              <Button hierarchy="link-color" trailingIcon={<ArrowRight />}>Learn more</Button>
            </Row>

            <Row label="Dot leading">
              <Button icon="dot-leading">In progress</Button>
              <Button icon="dot-leading" hierarchy="secondary-color">Pending</Button>
              <Button icon="dot-leading" hierarchy="secondary-gray">Draft</Button>
              <Button icon="dot-leading" hierarchy="tertiary-gray">Archived</Button>
            </Row>

            <Row label="Icon only">
              {(["primary", "secondary-color", "secondary-gray", "tertiary-color", "tertiary-gray"] as const).map((h) => (
                <Button key={h} icon="icon-only" hierarchy={h} ariaLabel="Add item">
                  <PlusIcon />
                </Button>
              ))}
            </Row>

            <Row label="Disabled">
              <Button disabled>Primary</Button>
              <Button disabled hierarchy="secondary-color">Secondary color</Button>
              <Button disabled hierarchy="secondary-gray">Secondary gray</Button>
              <Button disabled hierarchy="tertiary-color">Tertiary</Button>
              <Button disabled hierarchy="link-color">Link</Button>
            </Row>

            <Row label="Destructive">
              <Button
                hierarchy="primary"
                className="bg-error-600 border-error-600 hover:bg-error-700 hover:border-error-700"
                leadingIcon={<TrashIcon />}
              >
                Delete account
              </Button>
              <Button
                hierarchy="secondary-gray"
                className="text-error-600 hover:text-error-700"
                leadingIcon={<TrashIcon />}
              >
                Remove item
              </Button>
            </Row>
          </Section>
        )}

        {/* ── TOGGLE ── */}
        {tab === "Toggle" && (
          <Section title="Toggle">
            <Row label="Default type — both sizes">
              <Toggle size="sm" label="Small (sm)" />
              <Toggle size="md" label="Medium (md)" />
            </Row>

            <Row label="Slim type — both sizes">
              <Toggle type="slim" size="sm" label="Slim small" />
              <Toggle type="slim" size="md" label="Slim medium" />
            </Row>

            <Row label="States">
              <Toggle label="Off (default)" />
              <Toggle label="On (default)" defaultChecked />
            </Row>

            <Row label="With supporting text">
              <Toggle
                label="Marketing emails"
                supportingText="Get updates about new products and promotions."
                defaultChecked
              />
            </Row>

            <Row label="Disabled">
              <Toggle label="Disabled off" disabled />
              <Toggle label="Disabled on" defaultChecked disabled />
            </Row>

            <Row label="Settings panel example">
              <div className="bg-white border border-gray-200 rounded-xl w-[420px] shadow-xs divide-y divide-gray-100">
                {[
                  { label: "Email notifications", sub: "Get notified when someone mentions you.", on: true },
                  { label: "Push notifications", sub: "Receive alerts on your devices.", on: false },
                  { label: "Weekly digest", sub: "A summary of your weekly activity.", on: true },
                  { label: "Security alerts", sub: "Critical account security updates.", on: true },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-start px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{item.label}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{item.sub}</p>
                    </div>
                    <Toggle defaultChecked={item.on} />
                  </div>
                ))}
              </div>
            </Row>
          </Section>
        )}

        {/* ── INPUT FIELD ── */}
        {tab === "Input Field" && (
          <Section title="Input Field">
            <Row label="Sizes">
              <div className="flex-1 min-w-[220px]">
                <InputField size="sm" label="Small (sm)" placeholder="olivia@untitledui.com" required />
              </div>
              <div className="flex-1 min-w-[220px]">
                <InputField size="md" label="Medium (md)" placeholder="olivia@untitledui.com" required />
              </div>
            </Row>

            <Row label="States — click each to see focus ring">
              <div className="flex-1 min-w-[200px]">
                <InputField label="Empty" placeholder="Placeholder text" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <InputField label="With value" defaultValue="olivia@untitledui.com" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <InputField label="Disabled" defaultValue="Cannot edit" disabled hintText="This field is read-only." />
              </div>
            </Row>

            <Row label="Destructive (error) state">
              <div className="flex-1 min-w-[220px]">
                <InputField
                  label="Email"
                  destructive
                  defaultValue="invalid-email"
                  hintText="Please enter a valid email address."
                  required
                />
              </div>
              <div className="flex-1 min-w-[220px]">
                <InputField
                  label="Password"
                  type="password"
                  destructive
                  defaultValue="123"
                  hintText="Must be at least 8 characters."
                />
              </div>
            </Row>

            <Row label="With icons">
              <div className="flex-1 min-w-[220px]">
                <InputField label="Search" placeholder="Search anything…" variant="icon-leading" leadingIcon={<SearchIcon />} />
              </div>
              <div className="flex-1 min-w-[220px]">
                <InputField label="Email" placeholder="you@example.com" variant="icon-leading" leadingIcon={<MailIcon />} helpIcon />
              </div>
            </Row>

            <Row label="With hint text">
              <div className="flex-1 min-w-[220px]">
                <InputField label="Email" placeholder="you@example.com" hintText="We'll never share your email." />
              </div>
              <div className="flex-1 min-w-[220px]">
                <InputField label="API key" placeholder="sk-..." helpIcon hintText="Keep this secret and never share it." />
              </div>
            </Row>

            <Row label="Sign up form example">
              <div className="bg-white border border-gray-200 rounded-2xl p-7 w-full max-w-[440px] shadow-xs">
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-gray-900">Create your account</h3>
                  <p className="text-sm text-gray-500 mt-1">Start your 30-day free trial.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <InputField label="First name" placeholder="Jane" required size="sm" />
                    <InputField label="Last name" placeholder="Doe" required size="sm" />
                  </div>
                  <InputField
                    label="Email"
                    placeholder="jane@example.com"
                    variant="icon-leading"
                    leadingIcon={<MailIcon />}
                    required
                    size="sm"
                  />
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    variant="icon-leading"
                    leadingIcon={<LockIcon />}
                    hintText="Must be at least 8 characters."
                    size="sm"
                  />
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <Button size="md" className="w-full justify-center">Get started</Button>
                  <Button hierarchy="secondary-gray" size="md" className="w-full justify-center">Sign in instead</Button>
                </div>
              </div>
            </Row>
          </Section>
        )}
      </main>
    </div>
  );
}
