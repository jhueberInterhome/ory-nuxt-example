interface SessionGW {
  active?: boolean
  authenticated_at?: string | undefined
  authentication_methods?: Authentication_method[] | Object[]
  authenticator_assurance_level?: string | undefined
  devices?: Device[] | Object[] | undefined
  expires_at?: string
  id?: string
  identity?: Identity | undefined | Object
  issued_at?: string | undefined
  tokenized?: string | undefined
  logout_url?: string | undefined
}
interface ApiResponseGW {}

interface Identity {
  created_at: string
  credentials: Credentials
  id: string
  metadata_admin: Metadata_admin
  metadata_public: Metadata_public
  recovery_addresses: Recovery_address[]
  schema_id: string
  schema_url: string
  state: string
  state_changed_at: string
  traits: string | null
  updated_at: string
  verifiable_addresses: Verifiable_address[]
}

interface Metadata_admin {}
interface Metadata_public {}
interface Config {}

interface Credentials {
  property1: Property
  property2: Property
}

interface Property {
  config: Config
  created_at: string
  identifiers: string[]
  type: string
  updated_at: string
  version: number
}

interface Recovery_address {
  created_at: string
  id: string
  updated_at: string
  value: string
  via: string
}

interface Verifiable_address {
  created_at: string
  id: string
  status: string
  updated_at: string
  value: string
  verified: string
  verified_at: string
  via: string
}

interface Authentication_method {
  aal: string | undefined
  completed_at: string | undefined
  method: string | undefined
}

interface Device {
  id?: string | undefined
  ip_address?: string | undefined
  location?: string | undefined
  user_agent?: string | undefined
}

interface LogoutData {
  logout_url: string
  logout_token: string
}
