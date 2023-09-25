<script>
    import { signIn, signOut } from "@auth/sveltekit/client"
    import { page } from "$app/stores"
  </script>
  
  <h1>SvelteKit Auth Example</h1>
  <p>
    {#if $page.data.session}
      {#if $page.data.session.user?.image}
        <span
          style="background-image: url('{$page.data.session.user.image}')"
          class="avatar"
        />
      {/if}
      <span class="signedInText">
        <small>Signed in as</small><br />
        <strong>{$page.data.session.user?.name ?? "User"}</strong>
      </span>
      <button on:click={()=>{fetch("http://localhost:3000/",{
        method:"GET"
      })}}>hit api</button>
      <button on:click={() => signOut()} class="button">Sign out</button>
    {:else}
      <span class="notSignedInText">You are not signed in</span>
      <button on:click={()=>signIn('google')}>Sign In with Google</button>
      <button on:click={() => signIn("email",{email:"mohd.anas.292004@gmail.com"})}>Sign In with Email</button>
    {/if}
  </p>