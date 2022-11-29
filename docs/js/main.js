window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    // キャンバスを作成する
    async function makeCanvas(type, options=null) {
        console.log(type, options)
        const canvas = document.getElementById(`canvas-${type}`);
        const ctx = canvas.getContext(type, options);
        await drawCanvas(type, ctx, canvas)
    }
    async function drawCanvas(type, ctx, canvas) {
        switch (type) {
            case '2d':
                ctx.fillStyle = 'green';
                ctx.fillRect(10, 10, 150, 100);
                break
            case 'webgl':
                if (null == ctx) { console.log(`'webgl'を利用できません。OpenGL ES 2.0が未実装のためです。`) }
                ctx.clearColor(0.0, 0.0, 0.0, 1.0);
                ctx.clear(ctx.COLOR_BUFFER_BIT);
                break
            case 'webgl2':
                if (null == ctx) { console.log(`'webgl2'を利用できません。OpenGL ES 3.0が未実装のためです。`) }
                ctx.clearColor(0.0, 0.0, 0.0, 1.0);
                ctx.clear(ctx.COLOR_BUFFER_BIT);
                break
            case 'bitmaprenderer':
                const res = await fetch(`asset/image/monar-mark-gold.png`);
                const blob = await res.blob();
                const bitmap = await createImageBitmap(blob);
                canvas.width = bitmap.width;
                canvas.height = bitmap.height;
                ctx.transferFromImageBitmap(bitmap)
                break
            default:
                break
        }
    }
    for await (const type of ['2d', 'webgl', 'webgl2', 'bitmaprenderer']) { await makeCanvas(type); }

    // オプションを変更するたびキャンバス作成する
    function getParams(keys, n, newKey, newValue) {
        let params = {}
        for (const key of keys) {
            params[key] = getInputValue(`c${n}-${key}`)
        }
        params[newKey] = newValue
        return params
    }
    const C0_KEYS = ['alpha', 'colorSpace', 'desynchronized', 'willReadFrequently']
    const CN_KEYS = ['alpha', 'depth', 'stencil', 'desynchronized', 'antialias', 'failIfMajorPerformanceCaveat', 'powerPreference', 'premultipliedAlpha', 'preserveDrawingBuffer', 'xrCompatible']
    function getParamsC0(newKey, newValue) { return getParams(C0_KEYS , 0, newKey, newValue) }
    function getParamsCN(n, newKey, newValue) { return getParams(CN_KEYS , n, newKey, newValue) }
    function getInputValue(id) {
        switch (document.getElementById(id).type) {
            case 'checkbox':
            case 'radio': return document.getElementById(id).checked
            default: return  document.getElementById(id).value
        }
    }
    for (const key of ['alpha', 'colorSpace', 'desynchronized', 'willReadFrequently']) {
        document.getElementById(`c0-${key}`).addEventListener('input', async(event) => {
            makeCanvas(`2d`, getParamsC0(event.target.id.split('-')[1], (('checkbox'===event.target.type) ? event.target.checked : event.target.value)))
        })
    }
    for (const n of [1, 2]) {
        for (const key of ['alpha', 'depth', 'stencil', 'desynchronized', 'antialias', 'failIfMajorPerformanceCaveat', 'powerPreference', 'premultipliedAlpha', 'preserveDrawingBuffer', 'xrCompatible']) {
            document.getElementById(`c${n}-${key}`).addEventListener('input', async(event) => {
                makeCanvas(`2d`, getParamsCN(n, event.target.id.split('-')[1], (('checkbox'===event.target.type) ? event.target.checked : event.target.value)))
            })
        }
    }
});
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload!!');
});

