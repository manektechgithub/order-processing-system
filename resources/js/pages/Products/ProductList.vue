<template>
    <div>
        <listing-component
            title="Products"
            api-url="/api/products"
            :headings="['#', 'Title', '']"
            :columns="['id', 'title', 'actions']"
            edit-url="/products/:id/edit"
            create-url="/products/create"
        />
    </div>
</template>
