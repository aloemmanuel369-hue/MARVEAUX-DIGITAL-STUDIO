import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { toast } from 'react-toastify'

export default function PODUpload({ shipmentId: initialShipmentId = '' }){
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [shipmentId, setShipmentId] = useState(initialShipmentId)

  function handleFile(e){
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function handleUpload(){
    if (!file) return toast.error('Please select a file to upload')
    setUploading(true)
    setProgress(0)

    try{
      // ensure storage bucket 'pod' exists in your Supabase project
      const userResp = await supabase.auth.getUser()
      const user = userResp.data?.user
      if (!user) throw new Error('You must be signed in to upload a POD')

      const timestamp = Date.now()
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
      // IMPORTANT: storage policies require uploads to be prefixed with the uploader's uid
      const path = `${user.id}/${timestamp}_${safeName}`

      const { data: uploadData, error: uploadError } = await supabase.storage.from('pod').upload(path, file, { upsert: false })
      if (uploadError) throw uploadError

      // get public url (or use createSignedUrl for private buckets)
      const { data: publicData, error: publicErr } = supabase.storage.from('pod').getPublicUrl(uploadData.path)
      if (publicErr) {
        console.warn('getPublicUrl error', publicErr)
      }

      const publicUrl = publicData?.publicUrl || publicData?.public_url || null

      // insert metadata record (make sure the table exists)
      const { error: insertErr } = await supabase.from('proof_of_delivery').insert([{ shipment_id: shipmentId || null, file_path: uploadData.path, public_url: publicUrl, uploaded_by: user?.id || null }])
      if (insertErr) throw insertErr

      toast.success('Proof of delivery uploaded')
      setFile(null)
      setPreview(null)
      setProgress(100)
    }catch(err){
      console.error(err)
      toast.error(err?.message || 'Upload failed')
    }finally{
      setUploading(false)
      setTimeout(()=>setProgress(0), 700)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-2 items-start">
        <div className="flex-1">
          <label className="block text-sm">Shipment ID (optional)</label>
          <input value={shipmentId} onChange={(e)=>setShipmentId(e.target.value)} className="mt-1 input w-full" placeholder="Shipment UUID" />
        </div>

        <div className="flex items-center gap-2">
          <label className="cursor-pointer inline-flex items-center gap-2 btn btn-touch px-3 py-2 border rounded">
            <input type="file" accept="image/*,application/pdf" onChange={handleFile} className="hidden" />
            <span>{file ? 'Change file' : 'Choose file'}</span>
          </label>

          <button onClick={handleUpload} disabled={uploading} className="btn btn-touch px-4 py-2 bg-brand text-white rounded">
            {uploading ? 'Uploading...' : 'Upload POD'}
          </button>
        </div>
      </div>

      {preview ? (
        <div className="flex items-center gap-4">
          <img src={preview} alt="preview" className="w-28 h-20 object-cover rounded-md border" />
          <div className="text-sm text-slate-500">Selected file: {file?.name}</div>
        </div>
      ) : null}

      {progress > 0 ? (
        <div className="w-full bg-gray-200 rounded-md h-2 overflow-hidden">
          <div className="h-full bg-brand" style={{ width: `${progress}%` }} />
        </div>
      ) : null}

      <div className="text-xs text-slate-500">Files are uploaded to the Supabase Storage bucket named <code>pod</code>. Uploads are prefixed with the uploader's user id to comply with storage policies (path: <code>{'{user_id}/{timestamp}_{filename}'}</code>).</div>
    </div>
  )
}
