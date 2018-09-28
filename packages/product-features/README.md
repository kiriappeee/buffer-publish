# @bufferapp/product-features

This component Provides the logic for supported product plans and features

You can use it by importing the module and adding a `<FeatureLoader>` component surrounding the component you wish to 
show based on usecase

So if you have a feature named `'super_mega_feature'` and you want the `<Super>` component to display for those users, 
you would wrap the component in 

```<FeatureLoader supportedFeature={'super_mega_feature'}><Super /></FeatureLoader>```

If you want to fallback to something else when the `'super_mega_feature'` isn't available then you can provide the 
`fallback={Component}` parameter.

This should allow you to be able to send through some value if this feature isn't available, maybe showing a message 
saying, hey why not upgrade to enjoy this feature, or perhaps just some static text / element to hold its place in the UI

To see more of the usecases supported, check out the story.jsx file...

When we use this component we pass in `productFeatures: state.productFeatures` so you shouldn't pass those in as they 
are being provided by the redux store but you can chose to send them in if you are using the component in isolation, 
just like in the tests themselves
