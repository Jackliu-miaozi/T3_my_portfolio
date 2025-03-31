import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "使用条款 | Jack's 主页",
  description: "了解使用Jack's主页网站的条款和条件，包括用户责任、知识产权和免责声明等内容。",
  keywords: ["使用条款", "服务条款", "用户协议", "法律条款"],
  openGraph: {
    title: "使用条款 | Jack's 主页",
    description: "了解使用Jack's主页网站的条款和条件，包括用户责任、知识产权和免责声明等内容。",
    url: "https://jackliu.com/terms",
    locale: "zh_CN",
    type: "website",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">使用条款</h1>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6 text-lg">
          最后更新日期：{new Date().toLocaleDateString("zh-CN")}
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">1. 接受条款</h2>
          <p>
            欢迎访问我的个人网站。通过访问和使用本网站，您同意遵守这些使用条款以及所有适用的法律和法规。
            如果您不同意这些条款的任何部分，请勿使用本网站。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">2. 知识产权</h2>
          <p>
            本网站及其原创内容、功能和设计均为网站所有者的财产，受著作权、商标和其他知识产权法律保护。
            未经明确许可，不得复制、分发、修改、创建衍生作品、公开展示、公开表演、转载或使用本网站的任何内容。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">3. 用户责任</h2>
          <p>使用本网站时，您同意：</p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>提供准确、真实和完整的信息</li>
            <li>维护您账户信息的安全性</li>
            <li>不进行任何非法或未经授权的活动</li>
            <li>不干扰或破坏网站的安全功能</li>
            <li>不收集或跟踪其他用户的个人信息</li>
            <li>不上传包含病毒、恶意代码或有害程序的内容</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">4. 用户内容</h2>
          <p>
            如果您在本网站上发布内容（如评论、留言等），您授予网站所有者非独占的、免版税的许可，
            允许使用、复制、编辑、发布、翻译和分发您的内容。您对您发布的内容负全部责任，
            并保证您有权发布该内容且不违反任何第三方权利。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">5. 免责声明</h2>
          <p>
            本网站按&ldquo;现状&rdquo;提供，不提供任何明示或暗示的保证。网站所有者不保证网站的准确性、
            完整性或可靠性，也不保证网站将不间断、及时、安全或无错误地运行。
          </p>
          <p className="mt-2">
            您理解并同意，使用本网站的风险由您自行承担。在任何情况下，网站所有者对于因使用或无法使用本网站
            而导致的任何损失或损害不承担责任。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">6. 第三方链接</h2>
          <p>
            本网站可能包含指向第三方网站的链接。这些链接仅为方便用户而提供，
            网站所有者不对这些第三方网站的内容、准确性或任何其他方面负责。
            访问任何链接网站的风险由您自行承担。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">7. 隐私政策</h2>
          <p>
            使用本网站也受我们的隐私政策约束，该政策可在
            <a href="/privacy" className="text-primary mx-1 hover:underline">
              隐私政策
            </a>
            页面查看。使用本网站即表示您同意我们按照隐私政策收集和使用您的个人信息。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">8. 条款修改</h2>
          <p>
            网站所有者保留随时修改这些使用条款的权利。修改后的条款将在网站上发布时立即生效。
            继续使用本网站即表示您接受修改后的条款。建议您定期查看这些条款以了解任何变更。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">9. 适用法律</h2>
          <p>
            这些使用条款受中华人民共和国法律管辖，并按其解释。您同意服从中国法院的专属管辖权，
            解决与这些条款相关的任何争议。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">10. 联系我们</h2>
          <p>如果您对这些使用条款有任何疑问或建议，请通过以下方式联系我们：</p>
          <p className="mt-2">
            电子邮件：
            <a
              href="mailto:lzyujn@gmail.com"
              className="text-primary hover:underline"
            >
              lzyujn@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
