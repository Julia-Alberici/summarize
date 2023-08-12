'use client';
import { pricing } from "@/tokens"
import PricingCard from "./components/pricing-card"

const Pricing = () => {
    return (
        <div className="mb-10 flex flex-1 flex-col">
            <div className="mb-16 w-full flex justify-center items-center flex-col">
                <h1 className="head_secondary_text">Pricing Plans</h1>
                <h2 className="desc">We were born to help you save time. How much is your time worth?</h2>
            </div>
            <div className="flex flex-col gap-8 justify-center items-center xl:flex-row">
                {pricing.map((item, index) => (
                    <PricingCard key={item.title + index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default Pricing