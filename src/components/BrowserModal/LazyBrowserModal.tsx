"use client";

import dynamic from "next/dynamic";

type LazyBrowserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DeferredBrowserModal = dynamic(() => import("."), {
  ssr: false,
});

const LazyBrowserModal = (props: LazyBrowserModalProps) => <DeferredBrowserModal {...props} />;

export default LazyBrowserModal;
