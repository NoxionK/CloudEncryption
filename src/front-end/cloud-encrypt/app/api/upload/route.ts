import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = await request.blob()
  console.log(data)
  // const file: File | null = data.get('file') as unknown as File

  // if (!file) {
  //   return NextResponse.json({ success: false })
  // }

  // const bytes = await file.arrayBuffer()
  // const buffer = Buffer.from(bytes)

  // const path = `/storage/${file.name}`
  // await writeFile(path, buffer)
  // console.log(`open ${path} to see the uploaded file`)

  return NextResponse.json({ success: true })
}
