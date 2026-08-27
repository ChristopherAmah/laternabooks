import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholderImg from "../assets/guitar.jpg";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { useStore } from "../context/StoreContext";
import { API_BASE } from "../utils/api";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    let isMounted = true;

    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/product_details/${productId}`);
        if (!response.ok) throw new Error(`Error ${response.status}`);

        const data = await response.json();
        if (isMounted) setProduct(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProductDetails();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-600" />
      </div>
    );
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] px-6 text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f7f8fa] text-gray-500">Product not found</div>;
  }

  const {
    name,
    base_price,
    current_price,
    in_stock,
    description,
    image_url,
    attributes,
    sku,
  } = product;
  const price = current_price ?? base_price ?? 0;
  const hasPriceReduction = current_price != null && current_price < base_price;

  return (
    <div className="min-h-screen bg-[#f7f8fa] px-3 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-600"
        >
          <FaArrowLeft aria-hidden="true" /> Back to shop
        </button>

        <div className="grid overflow-hidden border border-gray-200 bg-white lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
          <section className="relative flex min-h-[16rem] items-center justify-center border-b border-gray-200 bg-[#eef1f5] p-5 sm:min-h-[22rem] sm:p-14 lg:min-h-[34rem] lg:border-b-0 lg:border-r">
            <div className="flex h-full w-full items-center justify-center bg-white p-6 shadow-sm sm:p-10">
              <img
                src={image_url || placeholderImg}
                alt={name}
                className={`max-h-[20rem] max-w-full object-contain transition-transform duration-500 hover:scale-105 sm:max-h-[28rem] ${
                  !in_stock ? "grayscale opacity-60" : ""
                }`}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = placeholderImg;
                }}
              />
            </div>
          </section>

          <section className="flex flex-col p-6 sm:p-10 lg:p-12">
            <div className="border-b border-gray-200 pb-7">
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                  {sku ? `SKU ${sku}` : "Laterna Books"}
                </p>
                <span className={`text-xs font-bold uppercase tracking-wide ${in_stock ? "text-emerald-700" : "text-red-600"}`}>
                  {in_stock ? "In stock" : "Out of stock"}
                </span>
              </div>

              <h1 className="max-w-xl text-2xl font-bold leading-tight text-gray-950 sm:text-3xl md:text-4xl">{name}</h1>

              <div className="mt-7 flex items-end gap-3">
                <span className="text-3xl font-bold text-orange-600">&#8358;{Number(price).toLocaleString()}</span>
                {hasPriceReduction && (
                  <span className="pb-1 text-sm text-gray-400 line-through">&#8358;{Number(base_price).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="py-7">
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">Description</h2>
              {description ? (
                <div
                  className="prose max-w-none text-sm leading-7 text-gray-600 prose-p:my-0"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              ) : (
                <p className="text-sm leading-7 text-gray-500">No description is available for this product.</p>
              )}

              {attributes?.length > 0 && (
                <div className="mt-7 border-t border-gray-200 pt-6">
                  <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">Specifications</h2>
                  <dl className="divide-y divide-gray-200 border-y border-gray-200">
                    {attributes.map((attribute, index) => (
                      <div key={`${attribute.name}-${index}`} className="grid grid-cols-2 gap-4 py-3 text-sm">
                        <dt className="text-gray-500">{attribute.name || "Attribute"}</dt>
                        <dd className="font-medium text-gray-800">{attribute.value || "N/A"}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>

            <div className="mt-auto border-t border-gray-200 pt-6">
              <button
                type="button"
                onClick={() => addToCart(product)}
                disabled={!in_stock}
                className={`flex w-full items-center justify-center gap-3 py-4 text-base font-bold transition ${
                  in_stock
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "cursor-not-allowed bg-gray-200 text-gray-500"
                }`}
              >
                <FaShoppingCart aria-hidden="true" />
                {in_stock ? "Add to cart" : "Out of stock"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;