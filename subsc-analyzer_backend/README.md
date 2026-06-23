# subsc-analyzer

このプロジェクトには、SAM CLI を使用してデプロイできるサーバーレスアプリケーションのソースコードとサポートファイルが含まれています。以下のファイルとフォルダが含まれています。

- `hello-world` - アプリケーションの Lambda 関数のコード。
- `events` - 関数を呼び出すために使用できる呼び出しイベント。
- `hello-world/tests` - アプリケーションコードの単体テスト。
- `template.yaml` - アプリケーションの AWS リソースを定義するテンプレート。

このアプリケーションは、Lambda 関数や API Gateway API などのいくつかの AWS リソースを使用します。これらのリソースは、このプロジェクト内の `template.yaml` ファイルで定義されています。アプリケーションコードを更新するのと同じデプロイプロセスを通じて、テンプレートを更新して AWS リソースを追加することができます。

アプリケーションのビルドとテストに統合開発環境（IDE）を使用したい場合は、AWS Toolkit を使用できます。
AWS Toolkit は、SAM CLI を使用して AWS 上にサーバーレスアプリケーションを構築およびデプロイするための、人気のある IDE 向けのオープンソースプラグインです。AWS Toolkit は、Lambda 関数コードの簡素化されたステップスルーデバッグ体験も提供します。開始するには、以下のリンクを参照してください。

* [CLion](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [GoLand](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [IntelliJ](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [WebStorm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [Rider](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [PhpStorm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [PyCharm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [RubyMine](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [DataGrip](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
* [VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)
* [Visual Studio](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/welcome.html)

## サンプルアプリケーションのデプロイ

Serverless Application Model Command Line Interface (SAM CLI) は、Lambda アプリケーションを構築およびテストするための機能を追加する AWS CLI の拡張機能です。Docker を使用して、Lambda と一致する Amazon Linux 環境で関数を実行します。また、アプリケーションのビルド環境や API をエミュレートすることもできます。

SAM CLI を使用するには、以下のツールが必要です。

* SAM CLI - [SAM CLI のインストール](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* Node.js - [Node.js 20 のインストール](https://nodejs.org/en/) (NPM パッケージ管理ツールを含む)
* Docker - [Docker Community Edition のインストール](https://hub.docker.com/search/?type=edition&offering=community)

アプリケーションを初めてビルドおよびデプロイするには、シェルで以下を実行します：

```bash
sam build
sam deploy --guided


最初のコマンドはアプリケーションのソースをビルドします。2 番目のコマンドはアプリケーションをパッケージ化し、一連のプロンプトとともに AWS にデプロイします：

* **Stack Name (スタック名)**: CloudFormation にデプロイするスタックの名前。これはアカウントとリージョン内で一意である必要があり、プロジェクト名に一致するものを指定するのが良い出発点となります。
* **AWS Region (AWS リージョン)**: アプリケーションをデプロイする AWS リージョン。
* **Confirm changes before deploy (デプロイ前に変更を確認する)**: `yes` に設定すると、実行前に変更セットが表示され、手動で確認できます。`no` に設定すると、AWS SAM CLI はアプリケーションの変更を自動的にデプロイします。
* **Allow SAM CLI IAM role creation (SAM CLI による IAM ロールの作成を許可する)**: この例を含む多くの AWS SAM テンプレートは、AWS サービスにアクセスするために必要な AWS IAM ロールを AWS Lambda 関数用に作成します。デフォルトでは、これらは必要最小限の権限に絞り込まれています。IAM ロールを作成または変更する AWS CloudFormation スタックをデプロイするには、`capabilities` に `CAPABILITY_IAM` 値を提供する必要があります。このプロンプトで権限が提供されない場合、この例をデプロイするには `sam deploy` コマンドに `--capabilities CAPABILITY_IAM` を明示的に渡す必要があります。
* **Save arguments to samconfig.toml (引数を samconfig.toml に保存する)**: `yes` に設定すると、選択内容がプロジェクト内の設定ファイルに保存され、将来はパラメータなしで `sam deploy` を再実行するだけでアプリケーションに変更をデプロイできるようになります。

デプロイ後に表示される出力値の中に、API Gateway のエンドポイント URL があります。

## SAM CLI を使用したローカルでのビルドとテスト

`sam build` コマンドを使用してアプリケーションをビルドします。

```bash
subsc-analyzer$ sam build
```

SAM CLI は `hello-world/package.json` に定義されている依存関係をインストールし、デプロイパッケージを作成して `.aws-sam/build` フォルダに保存します。

テストイベントを使用して関数を直接呼び出すことで、単一の関数をテストします。イベントは、関数がイベントソースから受け取る入力を表す JSON ドキュメントです。テストイベントは、このプロジェクトの `events` フォルダに含まれています。

関数をローカルで実行し、`sam local invoke` コマンドで呼び出します。

```bash
subsc-analyzer$ sam local invoke HelloWorldFunction --event events/event.json
```

SAM CLI はアプリケーションの API をエミュレートすることもできます。`sam local start-api` を使用して、ポート 3000 でローカルに API を実行します。

```bash
subsc-analyzer$ sam local start-api
subsc-analyzer$ curl http://localhost:3000/
```

SAM CLI はアプリケーションテンプレートを読み取り、API のルートとそれらが呼び出す関数を決定します。各関数の定義の `Events` プロパティには、各パスのルートと HTTP メソッドが含まれています。

```yaml
      Events:
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get
```

## アプリケーションへのリソースの追加

アプリケーションテンプレートは、AWS Serverless Application Model (AWS SAM) を使用してアプリケーションリソースを定義します。AWS SAM は、関数、トリガー、API などの一般的なサーバーレスアプリケーションリソースを設定するためのよりシンプルな構文を持つ AWS CloudFormation の拡張機能です。[SAM 仕様](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md) に含まれていないリソースについては、標準の [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) リソースタイプを使用できます。

## Lambda 関数のログの取得、tail、およびフィルタリング

トラブルシューティングを簡素化するために、SAM CLI には `sam logs` というコマンドがあります。`sam logs` を使用すると、デプロイされた Lambda 関数によって生成されたログをコマンドラインから取得できます。このコマンドには、ターミナルにログを出力することに加えて、バグをすばやく見つけるのに役立ついくつかの便利な機能があります。

`注`: このコマンドは、SAM を使用してデプロイした関数だけでなく、すべての AWS Lambda 関数で機能します。

```bash
subsc-analyzer$ sam logs -n HelloWorldFunction --stack-name subsc-analyzer --tail
```

Lambda 関数のログのフィルタリングに関する詳細情報と例は、[SAM CLI ドキュメント](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html)で確認できます。

## 単体テスト

テストは、このプロジェクトの `hello-world/tests` フォルダに定義されています。NPM を使用して [Mocha テストフレームワーク](https://mochajs.org/) をインストールし、単体テストを実行します。

```bash
subsc-analyzer$ cd hello-world
hello-world$ npm install
hello-world$ npm run test
```

## クリーンアップ

作成したサンプルアプリケーションを削除するには、AWS CLI を使用します。プロジェクト名をスタック名として使用したと仮定すると、以下を実行できます。

```bash
sam delete --stack-name subsc-analyzer
```

## リソース

SAM 仕様、SAM CLI、およびサーバーレスアプリケーションの概念の概要については、[AWS SAM 開発者ガイド](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)を参照してください。

次に、AWS Serverless Application Repository を使用して、Hello World サンプルを超えるすぐに使えるアプリをデプロイし、作成者がアプリケーションをどのように開発したかを学ぶことができます：[AWS Serverless Application Repository メインページ](https://aws.amazon.com/serverless/serverlessrepo/)