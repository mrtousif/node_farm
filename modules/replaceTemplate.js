module.exports = (template, obj) => {
    let output = template.replace(/%product_name%/g, obj.productName)
    output = output.replace(/%product_image%/g, obj.image)
    output = output.replace(/%id%/g, obj.id)
    output = output.replace(/%origin%/g, obj.from)
    output = output.replace(/%vitamins%/g, obj.nutrients)
    output = output.replace(/%qty%/g, obj.quantity)
    output = output.replace(/%price%/g, obj.price)
    output = output.replace(/%product_desc%/g, obj.description)
    if (!obj.organic) {
        output = output.replace(/%not_organic%/g, 'not-organic')
    }
    return output
}