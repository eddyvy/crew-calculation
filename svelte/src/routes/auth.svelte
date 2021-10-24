<script lang="ts">
  import { client, token } from '../store'
  import { getAuth } from '../client/user/getAuth'

  let loginEmail: string
  let loginPass: string

  let regName: string
  let regCompany: string
  let regEmail: string
  let regPassword: string
  let regPassword2: string

  const requestAuth = async(email: string, password: string): Promise<void> => {
    const newToken = await getAuth(email, password, $client)
    console.log(newToken)
    token.set(newToken)
  }

  const handleLogin = () => {
    requestAuth(loginEmail, loginPass)
  }

  const handleRegister = (e: Event): void => {
    console.log(e.target)
  }

</script>

<svelte:head>
  <title>Crew Calculation - Auth</title>
</svelte:head>

<section>
  <h1>Login</h1>

  <form on:submit|preventDefault={handleLogin}>
    <h4>Email</h4>
    <input name="email" type="email" on:input={(e) => { loginEmail = e.target.value }}/>
    <h4>Contraseña</h4>
    <input name="password" type="password" on:input={(e) => { loginPass = e.target.value }}/>
    <button>Login</button>
  </form>

  <h1>Regístrate</h1>

  <form on:submit|preventDefault={handleRegister}>
    <h4>Nombre</h4>
    <input name="name" type="name" on:input={(e) => { regName = e.target.value }}/>
    <h4>Compañía</h4><span>(Opcional)</span>
    <input name="company" type="text" on:input={(e) => { regCompany = e.target.value }}/>
    <h4>Email</h4>
    <input name="email" type="email" on:input={(e) => { regEmail = e.target.value }}/>
    <h4>Contraseña</h4>
    <input name="password" type="password" on:input={(e) => { regPassword = e.target.value }}/>
    <h4>Repite la contraseña</h4>
    <input name="password2" type="password" on:input={(e) => { regPassword2 = e.target.value }}/>
    <button>Registrar</button>
  </form>

</section>
