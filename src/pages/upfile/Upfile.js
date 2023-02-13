import React, { useEffect, useRef } from 'react'
import { Web3Storage } from 'web3.storage'

function Upfile() {
    const inputRef = useRef();
    console.log(inputRef.current)
    // Construct with token and endpoint
    useEffect(() => {
        const testFile = async () => {
            const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEEzZmExNTI1YzIzMGJlNENGNzE2MjE3NTQwNzBhRmU2N0U4YThGMUUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU5NjEwMzg3MTYsIm5hbWUiOiJyZWFjdC1hcHAifQ.4HNKJBaA9pCXkD32i90PPjx3ag77qNnb5nYN2faDqsU" })
            const fileInput = document.querySelector('input[type="file"]')
            //const fileInput =inputRef.current;
            console.log(fileInput.files)

            // Pack files into a CAR and send to web3.storage
            const rootCid = await client.put(fileInput.files) // Promise<CIDString>
            console.log(rootCid)
            // Get info on the Filecoin deals that the CID is stored in
            const info = await client.status(rootCid) // Promise<Status | undefined>

            // Fetch and verify files from web3.storage
            const res = await client.get(rootCid) // Promise<Web3Response | null>
            const files = await res.files() // Promise<Web3File[]>
            for (const file of files) {
                console.log(`https://${file.cid}.ipfs.w3s.link ${file.name} ${file.size}`)
            }
        }
        testFile()
    }, [inputRef.current]);
    return (
        <div>
            <h1>file</h1>
            <input type="file"  ref={inputRef} />
        </div>
    )
}

export default Upfile

