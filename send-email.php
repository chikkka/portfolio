<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    mb_language("Japanese");
    mb_internal_encoding("UTF-8");

    // ▼ reCAPTCHA v2 検証
    $secretKey = "6Lf9u5ArAAAAAPuwLfPe6vkP2D2Cn0AzWt5TXFJ_"; // 新しいシークレットキー
    $token = $_POST['g-recaptcha-response'] ?? '';

    if (!$token) {
        die("reCAPTCHA認証が行われていません。チェックボックスを確認してください。");
    }

    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secretKey}&response={$token}");
    $captchaResponse = json_decode($verify, true);

    if (!$captchaResponse["success"]) {
        die("reCAPTCHA認証に失敗しました。もう一度お試しください。");
    }

    // ▼ フォームデータの取得＆サニタイズ
    $name    = htmlspecialchars(trim($_POST["name"]), ENT_QUOTES, "UTF-8");
    $phone   = htmlspecialchars(trim($_POST["phone"]), ENT_QUOTES, "UTF-8");
    $email   = htmlspecialchars(trim($_POST["email"]), ENT_QUOTES, "UTF-8");
    $messageText = isset($_POST["message"]) ? htmlspecialchars(trim($_POST["message"]), ENT_QUOTES, "UTF-8") : "なし";

    // ▼ 必須項目チェック
    if (empty($name) || empty($phone) || empty(email) || empty($message)) {
        die("未入力の項目があります。");
    }

    // ▼ メール本文
    $message =
        "お名前: {$name}\n" .
        "電話番号: {$phone}\n" .
        "メールアドレス: {$email}\n" .
        "お問合せ内容: {$messageText}";

    // ▼ 送信先
    $to = "ch7.x.q0709@gmail.com";
    $subject = "お問い合わせフォームの送信";

    // ▼ Reply-To バリデーション（安全なメールのみ）
    $safeEmail = '';
    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $safeEmail = $email;
    }

    // ▼ 日本語のFrom名をMIMEエンコード（文字化け防止）
    $fromName = mb_encode_mimeheader("ママのためのサロンやます");

    // ▼ ヘッダー設定
    $headers  = "From: {$fromName} <no-reply >\r\n";
    if ($safeEmail) {
        $headers .= "Reply-To: {$safeEmail}\r\n";
    }

    // ▼ メール送信
    if (mb_send_mail($to, $subject, $message, $headers)) {
        header("Location: thankyou.html");
        exit();
    } else {
        echo "送信に失敗しました。";
    }
} else {
    echo "不正なアクセスです。";
}
?>