export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">隐私政策</h1>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-muted-foreground mb-6 text-lg">
          最后更新日期：{new Date().toLocaleDateString("zh-CN")}
        </p>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">概述</h2>
          <p>
            本隐私政策描述了我们如何收集、使用和保护您在使用本网站时提供的个人信息。
            我们重视您的隐私，并致力于保护您的个人数据。请仔细阅读本政策，以了解我们的做法。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">信息收集</h2>
          <p>我们可能收集以下类型的信息：</p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              <strong>个人识别信息</strong>
              ：当您注册账户、留言或与我们联系时，我们可能会收集您的姓名、电子邮件地址等信息。
            </li>
            <li>
              <strong>使用数据</strong>
              ：我们自动收集有关您如何访问和使用本网站的信息，包括您的IP地址、浏览器类型、访问时间等。
            </li>
            <li>
              <strong>Cookie和类似技术</strong>
              ：我们使用cookies和类似技术来跟踪网站活动并保存某些信息。
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">信息使用</h2>
          <p>我们收集的信息用于：</p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>提供、维护和改进我们的网站服务</li>
            <li>处理您的请求和回应您的询问</li>
            <li>发送与您的账户相关的通知</li>
            <li>监控网站使用情况和趋势</li>
            <li>防止欺诈活动和提高网站安全性</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">信息共享</h2>
          <p>
            我们不会出售或出租您的个人信息给第三方。但在以下情况下，我们可能会共享您的信息：
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>经您同意</li>
            <li>与提供服务的合作伙伴共享（如网站托管服务商）</li>
            <li>遵守法律要求或保护我们的权利</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">数据安全</h2>
          <p>
            我们采取合理的安全措施来保护您的个人信息不被未经授权的访问、使用或披露。
            然而，请注意互联网传输不是完全安全的，我们无法保证您的信息的绝对安全。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">您的权利</h2>
          <p>根据适用的数据保护法律，您可能拥有以下权利：</p>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>访问您的个人数据</li>
            <li>更正不准确的数据</li>
            <li>删除您的个人数据</li>
            <li>限制或反对处理您的数据</li>
            <li>数据可携带性</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">儿童隐私</h2>
          <p>
            我们的网站不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。
            如果您发现我们可能收集了儿童的个人信息，请联系我们，我们将采取措施删除这些信息。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">政策变更</h2>
          <p>
            我们可能会不时更新本隐私政策。我们会在网站上发布更新后的版本，并在重大变更时通知您。
            建议您定期查看本政策以了解任何变更。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">联系我们</h2>
          <p>如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：</p>
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
