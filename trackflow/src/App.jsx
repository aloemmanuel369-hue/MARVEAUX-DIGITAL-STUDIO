import React, { useEffect, useMemo, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { supabase } from './lib/supabaseClient'

const products = [
  {
    id: 'linen-vase',
    name: 'Linen Form Vase',
    category: 'Vases & Ceramics',
    price: 68,
    image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=900&q=85',
    description: 'A softly sculpted stoneware vessel with a chalky linen finish. Made for a single stem or a quiet corner.'
  },
  {
    id: 'arc-candle',
    name: 'Arc Soy Candle',
    category: 'Candles & Scent',
    price: 34,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85',
    description: 'Sandalwood, cedar and a trace of smoke, hand-poured into warm amber glass.'
  },
  {
    id: 'still-plates',
    name: 'Still Plates, Set of 2',
    category: 'Tableware',
    price: 56,
    image: 'https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85',
    description: 'Hand-finished porcelain plates for slow breakfasts and shared tables.'
  },
  {
    id: 'washed-linen',
    name: 'Washed Linen Throw',
    category: 'Linens & Textiles',
    price: 110,
    image: 'https://images.unsplash.com/photo-1600369671236-e74521d45b99?auto=format&fit=crop&w=900&q=85',
    description: 'A generous, breathable linen throw in a grounding natural oat.'
  },
  {
    id: 'curve-stool',
    name: 'Curve Oak Stool',
    category: 'Furniture Accents',
    price: 245,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=900&q=85',
    description: 'A compact solid-oak accent with a hand-rounded seat and honest grain.'
  },
  {
    id: 'clay-bowl',
    name: 'Weathered Clay Bowl',
    category: 'Vases & Ceramics',
    price: 82,
    image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&w=900&q=85',
    description: 'An imperfect, tactile bowl for fruit, keys, or simply its own silhouette.'
  }
]

const categories = ['All pieces', 'Vases & Ceramics', 'Tableware', 'Candles & Scent', 'Linens & Textiles', 'Furniture Accents']

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('still-life-cart') || '[]')
    } catch {
      return []
    }
  })

  const [user, setUser] = useState(null)
  const [authOpen, setAuthOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('still-life-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (!supabase) return

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
    })

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })

    return () => data?.subscription?.unsubscribe?.()
  }, [])

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      if (found) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }

      return [...current, { ...product, qty: 1 }]
    })

    toast.success('Added to your collection')
  }

  const updateQty = (id, qty) => {
    setCart((current) => {
      if (qty <= 0) return current.filter((item) => item.id !== id)
      return current.map((item) => (item.id === id ? { ...item, qty } : item))
    })
  }

  const itemCount = cart.reduce((total, item) => total + item.qty, 0)

  return (
    <>
      <Header count={itemCount} user={user} onAccount={() => setAuthOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/shop" element={<Shop addToCart={addToCart} />} />
          <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateQty={updateQty} />} />
          <Route path="/checkout" element={<Checkout cart={cart} user={user} />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account user={user} onAccount={() => setAuthOpen(true)} />} />
        </Routes>
      </main>
      <Footer />

      {authOpen && <AuthModal close={() => setAuthOpen(false)} setUser={setUser} />}
    </>
  )
}

function Header({ count, user, onAccount }) {
  return (
    <header className="header">
      <Link to="/" className="brand">
        STILL LIFE <span>HOME</span>
      </Link>

      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/story">Our story</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="actions">
        <button type="button" onClick={onAccount}>
          {user ? 'Account' : 'Sign in'}
        </button>
        <Link className="bag" to="/cart">
          Bag <b>{count}</b>
        </Link>
      </div>
    </header>
  )
}

function Home({ addToCart }) {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Objects for a considered life</p>
          <h1>
            Make space <br />
            <i>for stillness.</i>
          </h1>
          <p className="lede">
            Quiet, useful things for the spaces where life unfolds. Curated with intention,
            made to be lived with.
          </p>
          <Link className="button dark" to="/shop">
            Shop the collection <span>↗</span>
          </Link>
        </div>
        <div className="hero-image" />
      </section>

      <section className="intro">
        <p className="eyebrow">The edit / 01</p>
        <h2>
          Little rituals, <br />
          <i>beautifully made.</i>
        </h2>
        <p>
          We believe home is not a showroom. It is the morning light, a well-loved cup, and
          the things that make you feel at ease.
        </p>
      </section>

      <section className="featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected pieces</p>
            <h2>Made for everyday</h2>
          </div>
          <Link to="/shop">View all pieces ↗</Link>
        </div>

        <div className="product-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="story-banner">
        <div>
          <p className="eyebrow">Our philosophy</p>
          <h2>Less, but better.</h2>
          <p>
            Objects with a point of view, selected for their materiality, longevity, and quiet
            beauty.
          </p>
          <Link to="/story" className="text-link">
            Read our story ↗
          </Link>
        </div>
      </section>
    </>
  )
}

function Shop({ addToCart }) {
  const [category, setCategory] = useState('All pieces')
  const [sort, setSort] = useState('featured')

  const filteredProducts = useMemo(() => {
    let list = category === 'All pieces' ? products : products.filter((item) => item.category === category)

    if (sort === 'price') {
      list = [...list].sort((a, b) => a.price - b.price)
    }

    if (sort === 'newest') {
      list = [...list].sort((a, b) => b.id.localeCompare(a.id))
    }

    return list
  }, [category, sort])

  return (
    <section className="shop page">
      <div className="page-title">
        <p className="eyebrow">The collection</p>
        <h1>
          Things with <i>feeling.</i>
        </h1>
        <p>
          Thoughtful objects for the everyday rituals that make a house a home.
        </p>
      </div>

      <div className="shop-controls">
        <div className="filters">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Sort: Featured</option>
          <option value="price">Price: Low to high</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          <span>{product.category}</span>
        </div>

        <div className="product-meta">
          <div>
            <h3>{product.name}</h3>
            <p>{product.category}</p>
          </div>
          <strong>${product.price}</strong>
        </div>
      </Link>

      <button type="button" className="quick-add" onClick={() => addToCart(product)}>
        Add to bag +
      </button>
    </article>
  )
}

function Product({ addToCart }) {
  const { id } = useParams()
  const product = products.find((item) => item.id === id) || products[0]

  return (
    <section className="product-detail page">
      <div className="detail-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="detail-copy">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>

        <div className="option">
          <label>Finish</label>
          <button type="button">Natural <span>⌄</span></button>
        </div>

        <button type="button" className="button dark full" onClick={() => addToCart(product)}>
          Add to bag <span>+</span>
        </button>

        <div className="details">
          <p>Designed for slow living. Each piece is packed by hand in recyclable materials.</p>
          <p>Free shipping on orders over $150 · 30 day returns</p>
        </div>
      </div>
    </section>
  )
}

function Cart({ cart, updateQty }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <section className="page cart">
      <div className="page-title">
        <p className="eyebrow">Your collection</p>
        <h1>The bag</h1>
      </div>

      {!cart.length ? (
        <div className="empty">
          <p>Your bag is waiting for something beautiful.</p>
          <Link className="button dark" to="/shop">
            Explore the collection
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                  <div className="qty">
                    <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}>
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <strong>${(item.price * item.qty).toFixed(2)}</strong>
              </div>
            ))}
          </div>

          <div className="summary">
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
            <p>Shipping and taxes calculated at checkout.</p>
            <Link className="button dark full" to="/checkout">
              Continue to checkout ↗
            </Link>
          </div>
        </>
      )}
    </section>
  )
}

function Checkout({ cart, user }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      if (!supabase) {
        throw new Error('Supabase env vars are not configured yet.')
      }

      const form = new FormData(event.currentTarget)
      const payload = {
        items: cart,
        email: form.get('email') || user?.email
      }

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: payload
      })

      if (error) throw error

      if (data?.url) {
        window.location.href = data.url
      } else {
        toast.success('Checkout-ready. Connect Stripe in your Supabase Edge Function to continue.')
      }
    } catch (error) {
      console.error(error)
      toast.error('Checkout is not yet fully configured. Add Stripe keys and a server-side function.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page checkout">
      <div>
        <p className="eyebrow">Almost home</p>
        <h1>Checkout</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Email address
            <input name="email" type="email" defaultValue={user?.email || ''} required placeholder="you@example.com" />
          </label>

          <label>
            Shipping address
            <input required placeholder="Street address" />
          </label>

          <div className="form-row">
            <input required placeholder="City" />
            <input required placeholder="Postcode" />
          </div>

          <button type="submit" className="button dark full" disabled={loading}>
            {loading ? 'Opening secure checkout…' : 'Pay securely with Stripe ↗'}
          </button>
        </form>
      </div>

      <aside className="summary">
        <span>Order total</span>
        <strong>${total.toFixed(2)}</strong>
        <p>You’ll be redirected to Stripe’s secure hosted checkout.</p>
      </aside>
    </section>
  )
}

function Story() {
  return (
    <section className="page story">
      <p className="eyebrow">The still life philosophy</p>
      <h1>
        A home should feel <br />
        <i>like an exhale.</i>
      </h1>

      <img
        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
        alt="Calm, light-filled interior"
      />

      <div className="story-copy">
        <p>
          Still Life Home began with a simple belief: the objects around us shape the way we
          move through our days.
        </p>
        <p>
          We search for pieces that reward attention — a glaze that catches the light, linen
          that gets softer with time, a form that feels just right in the hand.
        </p>
      </div>
    </section>
  )
}

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    toast.success('Thank you — we will be in touch soon.')
    event.target.reset()
  }

  return (
    <section className="page contact">
      <div>
        <p className="eyebrow">Say hello</p>
        <h1>
          Let’s make room <br />
          <i>for a conversation.</i>
        </h1>
        <p>
          Questions about an order, a piece, or simply want to say hello? We would love to hear
          from you.
        </p>
        <a href="mailto:hello@stilllifehome.com">hello@stilllifehome.com</a>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input required placeholder="Your name" />
        </label>

        <label>
          Email
          <input required type="email" placeholder="you@example.com" />
        </label>

        <label>
          Message
          <textarea required rows="5" placeholder="How can we help?" />
        </label>

        <button type="submit" className="button dark">
          Send message ↗
        </button>
      </form>
    </section>
  )
}

function Account({ user, onAccount }) {
  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return (
    <section className="page account">
      <p className="eyebrow">Your space</p>
      <h1>Welcome{user?.email ? `, ${user.email.split('@')[0]}` : ''}.</h1>

      {user ? (
        <>
          <p>Your account and order history will appear here.</p>
          <button type="button" className="button outline" onClick={signOut}>
            Sign out
          </button>
        </>
      ) : (
        <>
          <p>Sign in to save pieces and see your orders.</p>
          <button type="button" className="button dark" onClick={onAccount}>
            Sign in / Create account
          </button>
        </>
      )}
    </section>
  )
}

function AuthModal({ close, setUser }) {
  const [mode, setMode] = useState('login')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!supabase) {
      toast.error('Please configure Supabase keys before creating an account.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      let result

      if (mode === 'login') {
        result = await supabase.auth.signInWithPassword({ email, password })
      } else {
        result = await supabase.auth.signUp({ email, password })
      }

      if (result.error) {
        toast.error(result.error.message)
        return
      }

      toast.success(mode === 'login' ? 'Welcome back' : 'Check your inbox to confirm your account')
      setUser(result.data.user)
      close()
    } catch (error) {
      toast.error('Authentication is not configured yet.')
    }
  }

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={close}>
          ×
        </button>

        <p className="eyebrow">Still Life Home</p>
        <h2>{mode === 'login' ? 'Welcome back.' : 'Make yourself at home.'}</h2>

        <form onSubmit={handleSubmit}>
          <input name="email" type="email" required placeholder="Email address" />
          <input name="password" type="password" required minLength="6" placeholder="Password (6+ characters)" />
          <button type="submit" className="button dark full">
            {mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <button type="button" className="switch" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
          {mode === 'login' ? 'New here? Create an account' : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer>
      <div>
        <Link className="brand" to="/">
          STILL LIFE <span>HOME</span>
        </Link>
        <p>Quiet objects for considered living.</p>
      </div>

      <div>
        <p className="eyebrow">Explore</p>
        <Link to="/shop">Shop</Link>
        <Link to="/story">Our story</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div>
        <p className="eyebrow">Stay awhile</p>
        <p>Notes on living intentionally, sent occasionally.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            toast.success('You are on the list.')
            event.target.reset()
          }}
        >
          <input type="email" required placeholder="Your email" />
          <button type="submit">↗</button>
        </form>
      </div>

      <small>© 2024 Still Life Home · Made with intention</small>
    </footer>
  )
}

export default App
