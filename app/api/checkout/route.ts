import { Product } from "@/type";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'

export async function POST (request:NextRequest) {
    const STRIPE_KEY= process.env.STRIPE_SECRET_KEY as string;
    if(!STRIPE_KEY) throw new Error("Stripe is not initiated");
    const stripe = new Stripe(STRIPE_KEY)
    const NEXT_AUTH_URL = process.env.NEXT_PUBLIC_NEXT_AUTH_URL ||
    "http://localhost:3000";
    const successUrl = `${NEXT_AUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${NEXT_AUTH_URL}/cart`
    try {
        const reqBody = await request.json();
        const { items, email } = reqBody;
        const extractingItems = items?.map((item: Product) => ({
            quantity: item?.quantity,
            price_data: {
                currency: "usd",
                unit_amount: Math.round(
                    item.price * 100 * (1 - item.discountPercentage / 100)
                ),
                product_data: {
                    name: item?.title,
                    description: item?.description,
                    images: item?.images,
                },
            },
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: extractingItems,
            mode: "payment",
            invoice_creation: {
                enabled: true,
            },
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                email,
            },
            customer_email: email,
        });
        return NextResponse.json({
            url: session?.url,
        });
    } catch (error) {
        return NextResponse.json({ error:error }, { status: 500 });
    }
};