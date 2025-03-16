;(() => {
  'use strict'
  var e = {
      235: function (e, t, n) {
        var r =
          (this && this.__awaiter) ||
          function (e, t, n, r) {
            return new (n || (n = Promise))(function (o, i) {
              function s(e) {
                try {
                  c(r.next(e))
                } catch (e) {
                  i(e)
                }
              }
              function a(e) {
                try {
                  c(r.throw(e))
                } catch (e) {
                  i(e)
                }
              }
              function c(e) {
                var t
                e.done
                  ? o(e.value)
                  : ((t = e.value),
                    t instanceof n
                      ? t
                      : new n(function (e) {
                          e(t)
                        })).then(s, a)
              }
              c((r = r.apply(e, t || [])).next())
            })
          }
        Object.defineProperty(t, '__esModule', { value: !0 }), (t.Table = void 0)
        const o = n(602)
        var i, s
        !(function (e) {
          ;(e.READONLY = 'readonly'), (e.READWRITE = 'readwrite')
        })(i || (i = {})),
          (function (e) {
            ;(e.METAS = 'metas'), (e.ASSETS = 'assets')
          })((s = t.Table || (t.Table = {}))),
          (t.default = class {
            constructor() {
              ;(this.db = null),
                (this.KEYPATH = 'fileName'),
                (this.DATABASE = 'ExtensionStore'),
                (this.DATABASE_VERSION = 1)
            }
            open() {
              return r(this, void 0, void 0, function* () {
                this.db = yield (0, o.openDB)(this.DATABASE, this.DATABASE_VERSION, {
                  upgrade: (e) => {
                    e.createObjectStore(s.ASSETS, { keyPath: this.KEYPATH }),
                      e.createObjectStore(s.METAS, { keyPath: this.KEYPATH })
                  },
                })
              })
            }
            saveFile(e, t, n, o = s.ASSETS) {
              return r(this, void 0, void 0, function* () {
                try {
                  const r = this.db.transaction(o, i.READWRITE),
                    s = r.objectStore(o),
                    a = this.getMime(n)
                  s.put({ fileName: e, file: { mime: a, type: n, fileContent: t } }), yield r.done
                } catch (e) {
                  console.error('Error saving file:', e)
                }
              })
            }
            getMime(e) {
              switch (e) {
                case 'txt':
                  return 'text/plain'
                case 'html':
                  return 'text/html'
                case 'css':
                  return 'text/css'
                case 'js':
                  return 'text/javascript'
                case 'json':
                  return 'application/json'
                case 'svg':
                  return 'image/svg+xml'
                case 'jpg':
                case 'jpeg':
                  return 'image/jpeg'
                case 'png':
                  return 'image/png'
                case 'gif':
                  return 'image/gif'
                case 'pdf':
                  return 'application/pdf'
                default:
                  return 'application/octet-stream'
              }
            }
            getFile(e, t = s.ASSETS) {
              return r(this, void 0, void 0, function* () {
                try {
                  const n = this.db.transaction(t, i.READONLY),
                    r = n.objectStore(t),
                    { file: o } = (yield r.get(e)) || { file: null }
                  return yield n.done, o
                } catch (e) {
                  return console.error('Error retrieving:', e), null
                }
              })
            }
            close() {
              var e
              null === (e = this.db) || void 0 === e || e.close()
            }
          })
      },
      661: (e, t) => {
        Object.defineProperty(t, '__esModule', { value: !0 }),
          (t.default =
            '\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Not Found</title>\n  </head>\n  <body>\n    <p>The file you are looking for is not available</p>\n  </body>\n</html>\n')
      },
      832: function (e, t, n) {
        var r =
            (this && this.__awaiter) ||
            function (e, t, n, r) {
              return new (n || (n = Promise))(function (o, i) {
                function s(e) {
                  try {
                    c(r.next(e))
                  } catch (e) {
                    i(e)
                  }
                }
                function a(e) {
                  try {
                    c(r.throw(e))
                  } catch (e) {
                    i(e)
                  }
                }
                function c(e) {
                  var t
                  e.done
                    ? o(e.value)
                    : ((t = e.value),
                      t instanceof n
                        ? t
                        : new n(function (e) {
                            e(t)
                          })).then(s, a)
                }
                c((r = r.apply(e, t || [])).next())
              })
            },
          o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e }
            }
        Object.defineProperty(t, '__esModule', { value: !0 })
        const i = o(n(235)),
          s = o(n(661)),
          a = ['extension-store']
        self.addEventListener('fetch', (e) => {
          e.respondWith(
            caches.match(e.request).then(() =>
              r(void 0, void 0, void 0, function* () {
                const t = a[0] + e.request.url.split(a[0]).pop(),
                  n = new i.default()
                yield n.open()
                const r = yield n.getFile(t),
                  o = (null == r ? void 0 : r.mime) || 'text/html',
                  c = (null == r ? void 0 : r.fileContent) || s.default,
                  u = (null == r ? void 0 : r.fileContent) ? 200 : 404,
                  l = (null == r ? void 0 : r.fileContent) ? 'Success' : 'Not Found',
                  d = new Blob([c], { type: o })
                return new Response(d, { status: u, statusText: l })
              }),
            ),
          )
        })
      },
      602: (e, t, n) => {
        n.r(t), n.d(t, { deleteDB: () => v, openDB: () => h, unwrap: () => p, wrap: () => f })
        const r = (e, t) => t.some((t) => e instanceof t)
        let o, i
        const s = new WeakMap(),
          a = new WeakMap(),
          c = new WeakMap()
        let u = {
          get(e, t, n) {
            if (e instanceof IDBTransaction) {
              if ('done' === t) return s.get(e)
              if ('store' === t) return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
            }
            return f(e[t])
          },
          set: (e, t, n) => ((e[t] = n), !0),
          has: (e, t) => (e instanceof IDBTransaction && ('done' === t || 'store' === t)) || t in e,
        }
        function l(e) {
          u = e(u)
        }
        function d(e) {
          return 'function' == typeof e
            ? ((t = e),
              (
                i ||
                (i = [
                  IDBCursor.prototype.advance,
                  IDBCursor.prototype.continue,
                  IDBCursor.prototype.continuePrimaryKey,
                ])
              ).includes(t)
                ? function (...e) {
                    return t.apply(p(this), e), f(this.request)
                  }
                : function (...e) {
                    return f(t.apply(p(this), e))
                  })
            : (e instanceof IDBTransaction &&
                (function (e) {
                  if (s.has(e)) return
                  const t = new Promise((t, n) => {
                    const r = () => {
                        e.removeEventListener('complete', o),
                          e.removeEventListener('error', i),
                          e.removeEventListener('abort', i)
                      },
                      o = () => {
                        t(), r()
                      },
                      i = () => {
                        n(e.error || new DOMException('AbortError', 'AbortError')), r()
                      }
                    e.addEventListener('complete', o), e.addEventListener('error', i), e.addEventListener('abort', i)
                  })
                  s.set(e, t)
                })(e),
              r(e, o || (o = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])) ? new Proxy(e, u) : e)
          var t
        }
        function f(e) {
          if (e instanceof IDBRequest)
            return (function (e) {
              const t = new Promise((t, n) => {
                const r = () => {
                    e.removeEventListener('success', o), e.removeEventListener('error', i)
                  },
                  o = () => {
                    t(f(e.result)), r()
                  },
                  i = () => {
                    n(e.error), r()
                  }
                e.addEventListener('success', o), e.addEventListener('error', i)
              })
              return c.set(t, e), t
            })(e)
          if (a.has(e)) return a.get(e)
          const t = d(e)
          return t !== e && (a.set(e, t), c.set(t, e)), t
        }
        const p = (e) => c.get(e)
        function h(e, t, { blocked: n, upgrade: r, blocking: o, terminated: i } = {}) {
          const s = indexedDB.open(e, t),
            a = f(s)
          return (
            r &&
              s.addEventListener('upgradeneeded', (e) => {
                r(f(s.result), e.oldVersion, e.newVersion, f(s.transaction), e)
              }),
            n && s.addEventListener('blocked', (e) => n(e.oldVersion, e.newVersion, e)),
            a
              .then((e) => {
                i && e.addEventListener('close', () => i()),
                  o && e.addEventListener('versionchange', (e) => o(e.oldVersion, e.newVersion, e))
              })
              .catch(() => {}),
            a
          )
        }
        function v(e, { blocked: t } = {}) {
          const n = indexedDB.deleteDatabase(e)
          return t && n.addEventListener('blocked', (e) => t(e.oldVersion, e)), f(n).then(() => {})
        }
        const y = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
          g = ['put', 'add', 'delete', 'clear'],
          b = new Map()
        function m(e, t) {
          if (!(e instanceof IDBDatabase) || t in e || 'string' != typeof t) return
          if (b.get(t)) return b.get(t)
          const n = t.replace(/FromIndex$/, ''),
            r = t !== n,
            o = g.includes(n)
          if (!(n in (r ? IDBIndex : IDBObjectStore).prototype) || (!o && !y.includes(n))) return
          const i = async function (e, ...t) {
            const i = this.transaction(e, o ? 'readwrite' : 'readonly')
            let s = i.store
            return r && (s = s.index(t.shift())), (await Promise.all([s[n](...t), o && i.done]))[0]
          }
          return b.set(t, i), i
        }
        l((e) => ({ ...e, get: (t, n, r) => m(t, n) || e.get(t, n, r), has: (t, n) => !!m(t, n) || e.has(t, n) }))
        const E = ['continue', 'continuePrimaryKey', 'advance'],
          D = {},
          S = new WeakMap(),
          w = new WeakMap(),
          B = {
            get(e, t) {
              if (!E.includes(t)) return e[t]
              let n = D[t]
              return (
                n ||
                  (n = D[t] =
                    function (...e) {
                      S.set(this, w.get(this)[t](...e))
                    }),
                n
              )
            },
          }
        async function* I(...e) {
          let t = this
          if ((t instanceof IDBCursor || (t = await t.openCursor(...e)), !t)) return
          const n = new Proxy(t, B)
          for (w.set(n, t), c.set(n, p(t)); t; ) yield n, (t = await (S.get(n) || t.continue())), S.delete(n)
        }
        function x(e, t) {
          return (
            (t === Symbol.asyncIterator && r(e, [IDBIndex, IDBObjectStore, IDBCursor])) ||
            ('iterate' === t && r(e, [IDBIndex, IDBObjectStore]))
          )
        }
        l((e) => ({ ...e, get: (t, n, r) => (x(t, n) ? I : e.get(t, n, r)), has: (t, n) => x(t, n) || e.has(t, n) }))
      },
    },
    t = {}
  function n(r) {
    var o = t[r]
    if (void 0 !== o) return o.exports
    var i = (t[r] = { exports: {} })
    return e[r].call(i.exports, i, i.exports, n), i.exports
  }
  ;(n.d = (e, t) => {
    for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] })
  }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (n.r = (e) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    n(832)
})()
//# sourceMappingURL=extensionprovider.js.map
