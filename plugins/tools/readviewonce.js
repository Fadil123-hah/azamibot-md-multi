let handler = async (m, { conn }) => {
	let q = m.quoted ? m.quoted : m
	let type = Object.keys(q.message || q)[0]
	if (!q.message?.[type].viewOnce) throw 'Itu bukan pesan viewOnce'
	try {
		let txt = (q.message[type].caption) || ''
		let buffer = await q.download()
		await conn.sendFile(m.chat, buffer, '', txt, null, false, { mentions: conn.parseMention(txt), quoted: m })
	} catch (e) {
		console.log(e)
		throw 'opened by owner'
	}
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^((read)?viewonce|rvo)$/i

export default handler
