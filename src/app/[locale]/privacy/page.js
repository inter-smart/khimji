import PrivacySection from "@/components/features/privacy/PrivacySection";

const local_data = {
  privacy_section_data: {
    title: "PRIVACY POLICY",
    text_editor_content: `
    <p>Khimji Ramdas LLC (“Khimji Ramdas,” “we,” “our,” or “us”) values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [www.kr.om] or interact with us through digital channels. By using our website, you agree to the terms of this Privacy Policy. If you do not agree, please do not access or use the website.</p>
    <h2>How We Use Your Information</h2>
    <p>We may use your information to:</p>
    <ul>
      <li>Provide, operate, and improve our website and services</li>
      <li>Respond to inquiries, requests, or customer support needs</li>
      <li>Send updates, newsletters, or promotional information (with your consent)</li>
      <li>Understand user behavior and improve website functionality</li>
      <li>Ensure compliance with legal obligations</li>
    </ul>
    <h2>How We Protect Your Information</h2>
    <p>We use appropriate technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. While we take all reasonable precautions, no online transmission or storage method is completely secure. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h2>Information Sharing and Disclosure</h2>
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely pain</p>
    <p>Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that</p>
    <h2>Information Sharing and Disclosure</h2>
    <p>Quis autem vel eum iure reprehenderit But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.  Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that</p>
    <ul>
    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod aut odit aut fugit, sed quia consequuntur magni dolores culpa qui officia  eos </li>
    <li>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium vel eum iure reprehenderit qui in ea voluptate velit</li>
    <li>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis  avoids pleasure itself, because it is pleasure, but because those who do not know how praesentium voluptatum </li>
    <li>Understand user behavior and improve website functionality  quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda </li>
    <li>Excepteur sint occaecat cupidatat non proident, sunt in o those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. </li>
    </ul>
    `,
  },
};

export default function page() {
  return <PrivacySection data={local_data?.privacy_section_data} />;
}
