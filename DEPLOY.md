# Putting zaaf.in live

Two things have to happen, and the second one is yours because it needs your
accounts: the site has to be hosted somewhere, and zaaf.in has to point at it.

Everything on this side is ready. `netlify.toml` tells the host how to build the
site, so there are no settings to fill in by hand.

## 1. Before anything else: get the code onto `main`

The website is on the branch `claude/intelligent-clarke-ypqcrn`. The `main`
branch still holds only the blueprint and the logos. A host deploys `main` by
default, so either merge the branch into `main`, or tell the host to deploy from
that branch instead. Say the word and the merge can be opened as a pull request.

## 2. Host it

The repository is **private**, which rules out GitHub Pages unless you make it
public or pay for GitHub Pro. Netlify, Vercel and Cloudflare Pages all host
private repositories free, and Netlify is the gentlest of the three.

1. Sign up at netlify.com with your GitHub account.
2. **Add new site → Import an existing project → GitHub →** `FarhanPeeCee/ZAAF`.
3. Pick the branch from step 1. Leave every build setting alone: `netlify.toml`
   already sets the base directory, the build command, the publish directory,
   the Node version and the routing rule that lets zaaf.in/learn work when
   someone opens it directly.
4. Deploy. You get a working address like `zaaf-academy.netlify.app`. Check the
   site there before touching the domain.

## 3. Point zaaf.in at it

In Netlify: **Domain management → Add a domain →** `zaaf.in`, and set it as the
primary domain so www redirects to it rather than the other way round. Netlify
then shows you the exact DNS records it wants. **Use the values it shows you**,
not the ones below, if the two ever disagree.

At the time of writing Netlify asks for these, and GoDaddy can do both:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `75.2.60.5` | 600 |
| CNAME | `www` | `your-site-name.netlify.app` | 600 |

In GoDaddy: **My Products → Domains → zaaf.in → DNS → Manage Zones.**

- Edit the existing `A` record for `@`. GoDaddy ships one pointing at its own
  parking page, and it has to become the value above rather than sit beside it.
- Edit or add the `CNAME` for `www`.
- Under **Forwarding**, delete any domain forwarding GoDaddy set up. Forwarding
  and DNS records fight each other, and forwarding usually wins.

DNS can take anywhere from a few minutes to a full day to spread. Netlify issues
the HTTPS certificate on its own once the records resolve, so zaaf.in will serve
over https:// without you doing anything further.

## If you would rather not use Netlify

Vercel and Cloudflare Pages work just as well and are also free for a private
repository. Both read `netlify.toml`'s intent differently, so ask and the
equivalent config can be added in a minute. Each one prints its own DNS records
once the domain is added; use those rather than any written here.

Figma can publish the code layer too, but a custom domain there needs a paid
Figma plan, and the account behind this project is on the free tier.

## Worth doing once it is live

- Tell WhatsApp Business the website is zaaf.in, so the link shows in the
  business profile.
- Set a WhatsApp greeting and an away message. Reply hours are stated on the
  site as 10am to 10pm India time, and an away message is what keeps a parent
  who writes at midnight from thinking she has been ignored.
