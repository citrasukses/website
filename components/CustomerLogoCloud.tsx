import { CustomerLogoCarousel } from "@/components/CustomerLogoCarousel";
import { getCustomerLogos } from "@/lib/customerAssets";

export function CustomerLogoCloud() {
  const customers = getCustomerLogos();

  return <CustomerLogoCarousel customers={customers} />;
}
