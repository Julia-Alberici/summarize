import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/common/card"
import { Button } from "../../../components/common/button";
import { Separator } from "@/components/common/separator"
import { Badge } from "@/components/common/badge"

export interface IPricingCard {
    title: string;
    description: string;
    price: number;
    summAmount: string;
    highlight?: boolean;
}

const PricingCard = (props: IPricingCard) => {
    return (
        <Card className={`w-[300px] sm:w-[380px] ${props.highlight ? 'border-indigo-700' : ''}`.trim()}>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>{props.title}</CardTitle>
                    {props.highlight && <Badge>Most Popular</Badge>}
                </div>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <span className="text-4xl font-bold">${props.price}</span><span className="font-medium text-muted-foreground">/month</span>
                </div>
                <Separator />
                <div className="flex justify-between my-2">
                    <p>Montly summaries amount</p>
                    <p className="font-bold">{props.summAmount}</p>
                </div>
                <Separator />
            </CardContent>
            <CardFooter>
                <Button variant={props.highlight ? 'default' : 'outlinePurple'} className="w-[100%]">Get Started</Button>
            </CardFooter>
        </Card>
    )
}

export default PricingCard