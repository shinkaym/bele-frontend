import { DangerIcon, SuccessIcon, WarningIcon } from "@/components/icons";

interface AlertProps {
  type: "warning" | "success" | "danger"; // Loại alert
  title: string; // Tiêu đề
  message: string; // Nội dung
  className?: string; // Custom class
}

const Alert = ({ type, title, message, className }: AlertProps) => {
  const typeStyles = {
    warning: {
      borderColor: "border-warning",
      bgColor: "bg-warning bg-opacity-[15%]",
      iconBg: "bg-warning bg-opacity-30",
      textColor: "text-[#9D5425]",
      messageColor: "text-[#D0915C]",
      icon: <WarningIcon />,
    },
    success: {
      borderColor: "border-[#34D399]",
      bgColor: "bg-[#34D399] bg-opacity-[15%]",
      iconBg: "bg-[#34D399]",
      textColor: "text-black dark:text-[#34D399]",
      messageColor: "text-body",
      icon: <SuccessIcon />,
    },
    danger: {
      borderColor: "border-[#F87171]",
      bgColor: "bg-[#F87171] bg-opacity-[15%]",
      iconBg: "bg-[#F87171]",
      textColor: "text-[#B45454]",
      messageColor: "text-[#CD5D5D]",
      icon: <DangerIcon />,
    },
  };

  const styles = typeStyles[type];

  return (
    <div
      className={`fixed top-3 right-3 backdrop-blur-md flex w-full max-w-[400px] border-l-6 px-7 py-8 shadow-lg md:p-9 z-99999 ${styles.borderColor} ${styles.bgColor} dark:bg-[#1B1B24] dark:bg-opacity-30 ${className}`}
      style={{
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // Thêm bóng mờ
      }}
    >
      <div
        className={`mr-5 flex h-9 w-9 items-center justify-center rounded-lg ${styles.iconBg}`}
      >
        {styles.icon}
      </div>
      <div className="w-full">
        <h5 className={`mb-3 text-lg font-semibold ${styles.textColor}`}>
          {title}
        </h5>
        <p className={`leading-relaxed ${styles.messageColor}`}>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
