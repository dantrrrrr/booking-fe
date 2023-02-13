import React, { useState, useReducer, useEffect, useRef } from 'react'
import { Web3Storage } from 'web3.storage'

export default function FileWeb3Upload() {
  const token_1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEzZmExNTI1YzIzMGJlNENGNzE2MjE3NTQwNzBhRmU2N0U4YThGMUUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU5NjEwMzg3MTYsIm5hbWUiOiJyZWFjdC1hcHAifQ.4HNKJBaA9pCXkD32i90PPjx3ag77qNnb5nYN2faDqsU";
  const token_2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEzZmExNTI1YzIzMGJlNENGNzE2MjE3NTQwNzBhRmU2N0U4YThGMUUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzQxOTk2NzM4NzAsIm5hbWUiOiJ1cGxvYWQtZmlsZSJ9.hAjvreD5wP7PL_Z8JzNJ0we6JgCd4EsZ1GQRC3qMcEI";
  const token_3 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEzZmExNTI1YzIzMGJlNENGNzE2MjE3NTQwNzBhRmU2N0U4YThGMUUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzYwNDg3NzE4NjEsIm5hbWUiOiJ3ZWIzIn0.31UBmE_w9quA5EsIruLlAV8cYNsV-gsXQf2jjBkWTlM";

  const [messages, showMessage] = useReducer((msgs, m) => msgs.concat(m), [])
  const [token, setToken] = useState(token_1 || token_2 || token_3)
  const [files, setFiles] = useState([])
  const [imgs, setImgs] = useState([]);
  // console.log(files[0].name)
  const inputRef = useRef();
  useEffect(() => {
    console.log(files)
    console.log(imgs)


  }, [files]);


  async function handleSubmit(e) {
    // don't reload the page!
    e.preventDefault()

    const client = new Web3Storage({ token })
    const cid = await client.put(files, {
      onRootCidReady: localCid => {
        showMessage('> 📡 Uploading files to server ! ')
      },
      // onStoredChunk: bytes => showMessage(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
    })
    setImgs(prev => [...prev, `https://${cid}.ipfs.dweb.link/${files[0].name}`])
    showMessage(`> ✅ File has been upload successfully `)
    console.log(`https://${cid}.ipfs.dweb.link/${files[0].name}`)

    setFiles('')
  }

  return (
    <>
      <header>
        <h1>⁂
          <span>UPload file</span>
          <div className="container">

            {imgs.map((img, index) => (
              <img src={img} style={{ width: "30vw", objectFit: "cover" }} alt="" />

            ))}
          </div>
        </h1>
      </header>
      <form id='upload-form' onSubmit={handleSubmit}>

        <input type='password' id='token' onChange={e => setToken(e.target.value)} hidden />
        <label htmlFor='filepicker'>Pick files to store</label>
        <input
          ref={inputRef}
          type='file'
          id='filepicker'
          name='fileList'
          onChange={(e) => {

            setFiles(e.target.files)
          }
          }
          // multiple
          required />
        <input type='submit' value='Submit' id='submit' />
      </form>
      <div id='output'>
        &gt; ⁂ waiting for form submission...
        {messages.map((m, i) => <div key={m + i}>{m}</div>)}
      </div>
    </>
  )
}