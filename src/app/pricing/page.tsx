import PricingCard, { IPricingCard } from "./components/pricing-card"
import { stripe } from "@/api/stripe";

const Pricing = async () => {
    const pricing = await getPricing();

    return (
        <div className="mb-10 flex flex-1 flex-col">
            <div className="mb-16 w-full flex justify-center items-center flex-col">
                <h1 className="head_secondary_text">Pricing Plans</h1>
                <h2 className="desc">We were born to help you save time. How much is your time worth?</h2>
            </div>
            <div className="flex flex-col gap-8 justify-center items-center xl:flex-row">
                {pricing.map((item, index) => (
                    <PricingCard key={item.name + index} {...item} />
                ))}
            </div>
        </div>
    )
}

async function getPricing() {
    const { data: prices } = await stripe.prices.list();
    const plans: IPricingCard[] = [];

    for (const price of prices) {
        const product = await stripe.products.retrieve(price.product as string);
        plans.push({
            name: product.name,
            description: product.description || '',
            price: (price.unit_amount || 0) / 100,
            highlight: Boolean(product.metadata.highlight),
            summAmount: product.metadata.summAmount
        })
    }

    plans.sort((a, b) => a.price - b.price);
    return plans;
}

export default Pricing