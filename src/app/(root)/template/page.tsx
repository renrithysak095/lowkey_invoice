import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import ProfileBox from "@/app/components/ProfileBox";
import InvoiceTemplateListing from "@/app/components/view/InvoiceTemplateListing";

export const metadata: Metadata = {
  title: "Next.js Profile Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Profile page for NextAdmin Dashboard Kit",
};

const Profile = () => {
  return (
    // <div className="mx-auto w-full max-w-[970px]">
    <div className="h-screen">

      {/* <Breadcrumb pageName="Profile" /> */}
      {/* <ProfileBox /> */}

      <InvoiceTemplateListing />


    </div>
  );
};

export default Profile;
