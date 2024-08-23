"use client";
import RenderInvoice from "@/app/components/others/RenderInvoice";

// export const metadata: Metadata = {
//   title: "Next.js Profile Page | NextAdmin - Next.js Dashboard Kit",
//   description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
// };

const Page = () => {

  let data = {
    krqr: "ok",
    table: [
      {
        no: 1,
        description: `A Shift`,
        unit_price: `$330.00`,
        quantity: `1`,
        amount: `$330.00`,
        children: [
          {
            description: `- Ordinary Guard (Male)`,
            unit_price: `$330.00`,
            quantity: `1`,
            amount: `$330.00`,
            children: [],
          },
          {
            description: `- Ordinary Guard (Female)`,
            unit_price: `$430.00`,
            quantity: `2`,
            amount: `$860.00`,
            children: [
              {
                description: `- Sub Row 1`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
              {
                description: `- Sub Row 2`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
            ],
          },
        ],
      },
      {
        no: 2,
        description: `C Shift`,
        unit_price: `$330.00`,
        quantity: `1`,
        amount: `$330.00`,
        children: [
          {
            description: `- Ordinary Guard (Male)`,
            unit_price: `$330.00`,
            quantity: `1`,
            amount: `$330.00`,
            children: [
              {
                description: `- Sub Row 1`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
              {
                description: `- Sub Row 2`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
            ]
          },
          {
            description: `- Ordinary Guard (Female)`,
            unit_price: `$330.00`,
            quantity: `1`,
            amount: `$330.00`,
            children: [
              {
                description: `- Sub Row 1`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
              {
                description: `- Sub Row 2`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
            ]
          },
        ],
      },
      {
        no: 3,
        description: `Service Overtime (Male)(2hours, 2.5hours and Other)`,
        unit_price: ``,
        quantity: ``,
        amount: ``,
        children: [
          {
            description: `- On Jun 2024 = 66h x $0.89= 58.74`,
            unit_price: `$330.00`,
            quantity: `1`,
            amount: `$330.00`,
            children: [
              {
                description: `- Sub Row 1`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
              {
                description: `- Sub Row 2`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
            ]
          },
          {
            description: `- On may 2024 = 32h x $0.89= 28.48`,
            unit_price: `$330.00`,
            quantity: `1`,
            amount: `$330.00`,
            children: [
              {
                description: `- Sub Row 1`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
              {
                description: `- Sub Row 2`,
                unit_price: `$330.00`,
                quantity: `1`,
                amount: `$330.00`,
              },
            ]
          },
        ],
      },
    ]
  }

  return (
    <div className="h-full">
      <RenderInvoice
        id={"3f4c2127-aead-4c89-a40c-136fb519aaa5"}
        apiKey={"W0LpYtcHt8J2T66_z7WG_g6bI2A09sWQKSMguGwpxSY"}
        json={data}
      />
    </div>
  );
};

export default Page;
