interface Session {
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
  created_at?: string
  credentials?: { [key: string]: IdentityCredentials }
  id: string
  metadata_admin?: Metadata_admin | null
  metadata_public?: Metadata_public | null
  recovery_addresses?: Recovery_address[]
  schema_id: string
  schema_url: string
  state?: string
  state_changed_at?: string
  traits: string | null
  updated_at?: string
  verifiable_addresses?: Verifiable_address[]
}

interface Metadata_admin {}
interface Metadata_public {}
interface Config {}

interface IdentityCredentials {
  config?: any
  created_at?: string
  identifiers?: string[]
  type?: IdentityCredentialsTypeEnum
  updated_at?: string
  version?: number
}

type IdentityCredentialsTypeEnum = 'password' | 'code' | 'oidc' | 'totp' | 'lookup_secret' | 'webauthn' | 'link_recovery' | 'code_recovery'

interface Property {
  config: Config
  created_at: string
  identifiers: string[]
  type: string
  updated_at: string
  version: number
}

interface Recovery_address {
  created_at?: string
  id: string
  updated_at?: string
  value: string
  via: string
}

interface Verifiable_address {
  created_at?: string
  id?: string
  status: string
  updated_at?: string
  value: string
  verified: boolean
  verified_at?: string
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

// Region -- Logout

interface LogoutFlowData {
  logout_url: string
  logout_token: string
}

// Region -- Login
interface LoginFlowData {
  id: string
  organization_id?: string | null
  type: string
  expires_at: string
  issued_at: string
  request_url: string
  ui: UiContainer
  created_at?: string
  updated_at?: string
  refresh?: boolean
  requested_aal?: AuthenticatorAssuranceLevel
  state: string
  active?: LoginFlowActiveEnum
  oauth2_login_challenge?: string
  // oauth2_login_request?: OAuth2LoginRequest
  return_to?: string
  session_token_exchange_code?: string
}

interface UiContainer {
  action: string
  method: string
  nodes: UiNode[]
  messages?: UiText[]
}

type AuthenticatorAssuranceLevel = 'aal0' | 'aal1' | 'aal2' | 'aal3'
type LoginFlowActiveEnum = 'code' | 'password' | 'oidc' | 'totp' | 'lookup_secret' | 'webauthn' | 'link_recovery' | 'code_recovery'

interface UiNode {
  attributes: UiNodeAttributes
  group: UiNodeGroupEnum
  messages: UiText[]
  meta: UiNodeMeta
  type: UiNodeTypeEnum
}

type UiNodeAttributes =
  | ({
      node_type: 'a'
    } & UiNodeAnchorAttributes)
  | ({
      node_type: 'img'
    } & UiNodeImageAttributes)
  | ({
      node_type: 'input'
    } & UiNodeInputAttributes)
  | ({
      node_type: 'script'
    } & UiNodeScriptAttributes)
  | ({
      node_type: 'text'
    } & UiNodeTextAttributes)

interface UiNodeImageAttributes {
  height?: number
  id: string
  node_type: string
  src: string
  width: number
}

interface UiNodeAnchorAttributes {
  href: string
  id: string
  node_type: string
  title: UiText
}

interface UiNodeInputAttributes {
  autocomplete?: string
  disabled: boolean
  label?: UiText
  name: string
  node_type: string
  onclick?: string
  pattern?: string
  required?: boolean
  type: UiNodeInputAttributesTypeEnum
  value?: any | null
}

type UiNodeInputAttributesTypeEnum =
  | 'number'
  | 'button'
  | 'text'
  | 'url'
  | 'password'
  | 'hidden'
  | 'email'
  | 'submit'
  | 'tel'
  | 'checkbox'
  | 'datetime-local'
  | 'date'

interface UiNodeScriptAttributes {
  async: boolean
  crossorigin: string
  id: string
  integrity: string
  node_type: string
  nonce: string
  referrerpolicy: string
  src: string
  type: string
}

interface UiNodeTextAttributes {
  id: string
  node_type: string
  text: UiText
}

type UiNodeGroupEnum = 'default' | 'code' | 'link' | 'password' | 'oidc' | 'profile' | 'totp' | 'lookup_secret' | 'webauthn'
type UiNodeTypeEnum = 'a' | 'img' | 'input' | 'script' | 'text'
interface UiText {
  context?: any
  id: number
  text: string
  type: string
}

type UiTextTypeEnum = 'error' | 'info' | 'success'

interface UiNodeMeta {
  label?: UiText
}

interface OAuth2LoginRequest {
  challenge: string
  client: OAuth2Client
  // oidc_context?: OAuth2ConsentRequestOpenIDConnectContext
  request_url: string
  requested_access_token_audience?: string[]
  requested_scope: string[]
  session_id?: string
  skip: boolean
  subject: string
}

interface OAuth2Client {
  access_token_strategy?: string
  allowed_cors_origins?: string[]
  audience?: string[]
  authorization_code_grant_access_token_lifespan?: string | null
  authorization_code_grant_id_token_lifespan?: string | null
  authorization_code_grant_refresh_token_lifespan?: string | null
  backchannel_logout_session_required?: boolean
  backchannel_logout_uri?: string
  client_credentials_grant_access_token_lifespan?: string | null
  client_id?: string
  client_name?: string
  client_secret?: string
  client_secret_expires_at?: number
  client_uri?: string
  contacts?: string[]
  created_at?: string
  frontchannel_logout_session_required?: boolean
  frontchannel_logout_uri?: string
  grant_types?: string[]
  implicit_grant_access_token_lifespan?: string | null
  implicit_grant_id_token_lifespan?: string | null
  jwks?: any
  jwks_uri?: string
  jwt_bearer_grant_access_token_lifespan?: string | null
  logo_uri?: string
  metadata?: object
  owner?: string
  policy_uri?: string
  post_logout_redirect_uris?: string[]
  redirect_uris?: string[]
  refresh_token_grant_access_token_lifespan?: string | null
  refresh_token_grant_id_token_lifespan?: string | null
  refresh_token_grant_refresh_token_lifespan?: string | null
  registration_access_token?: string
  registration_client_uri?: string
  request_object_signing_alg?: string
  request_uris?: string[]
  response_types?: string[]
  scope?: string
  sector_identifier_uri?: string
  skip_consent?: boolean
  skip_logout_consent?: boolean
  subject_type?: string
  token_endpoint_auth_method?: string
  token_endpoint_auth_signing_alg?: string
  tos_uri?: string
  updated_at?: string
  userinfo_signed_response_alg?: string
}

interface LoginResponse {
  session: Session
  session_token?: string
}

// Region -- register
interface RegistrationFlowData {
  active?: RegistrationFlowActiveEnum
  expires_at: string
  id: string
  issued_at: string
  oauth2_login_challenge?: string
  // oauth2_login_request?: OAuth2LoginRequest TODO: typ noch nacharbeiten
  organization_id?: string | null
  request_url: string
  return_to?: string
  session_token_exchange_code?: string
  state: any
  transient_payload?: any
  type: string
  ui: UiContainer
}

type RegistrationFlowActiveEnum = 'password' | 'code' | 'oidc' | 'totp' | 'lookup_secret' | 'webauthn' | 'link_recovery' | 'code_recovery'

interface RegistrationResponse {
  session?: Session
  session_token?: string
  continue_with?: ContinueWith[]
  identity?: Identity
}

// Region -- recovery
interface RecoveryFlowData {
  id: string
  active?: string
  continue_with?: ContinueWith[]
  expires_at: string
  issued_at: string
  request_url: string
  return_to?: string
  state: any
  transient_payload?: any
  type: string
  ui: UiContainer
}

type ContinueWith =
  | ({
      action: 'set_ory_session_token'
    } & ContinueWithSetOrySessionToken)
  | ({
      action: 'show_recovery_ui'
    } & ContinueWithRecoveryUi)
  | ({
      action: 'show_settings_ui'
    } & ContinueWithSettingsUi)
  | ({
      action: 'show_verification_ui'
    } & ContinueWithVerificationUi)

interface ContinueWithSetOrySessionToken {
  action: ContinueWithSetOrySessionTokenActionEnum
  ory_session_token: string
}

type ContinueWithSetOrySessionTokenActionEnum = 'set_ory_session_token'

interface ContinueWithRecoveryUi {
  action: ContinueWithRecoveryUiActionEnum
  flow: ContinueWithRecoveryUiFlow
}

interface ContinueWithRecoveryUiFlow {
  id: string
  url?: string
}

type ContinueWithRecoveryUiActionEnum = 'show_recovery_ui'

interface ContinueWithSettingsUi {
  action: ContinueWithSettingsUiActionEnum
  flow: ContinueWithSettingsUiFlow
}

type ContinueWithSettingsUiActionEnum = 'show_settings_ui'

interface ContinueWithSettingsUiFlow {
  id: string
}

interface ContinueWithVerificationUi {
  action: ContinueWithVerificationUiActionEnum
  flow: ContinueWithVerificationUiFlow
}

type ContinueWithVerificationUiActionEnum = 'show_verification_ui'

interface ContinueWithVerificationUiFlow {
  id: string
  url?: string
  verifiable_address: string
}

interface RecoveryResponse {
  active?: string
  continue_with?: ContinueWith[]
  expires_at: string
  id: string
  issued_at: string
  request_url: string
  return_to?: string
  state: any
  transient_payload?: any
  session?: Session
  session_token?: string
  identity?: Identity
}
