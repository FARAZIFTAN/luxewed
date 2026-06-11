import { useState } from 'react';
import { Gift, CreditCard, Wallet, MapPin, Check, Copy } from 'lucide-react';
import { giftOptions, GiftOption } from '../data/wedding';

interface GiftCardProps {
  option: GiftOption;
  index: number;
}

function GiftCard({ option, index }: GiftCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = () => {
    switch (option.type) {
      case 'bank':
        return <CreditCard size={22} className="text-gold" />;
      case 'ewallet':
        return <Wallet size={22} className="text-gold" />;
      case 'address':
        return <MapPin size={22} className="text-gold" />;
    }
  };

  return (
    <div
      className="luxury-card glass-card gold-border p-5 animate-fade-up"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
          {getIcon()}
        </div>
        <div>
          <p className="text-gold/60 text-xs uppercase tracking-wider">
            {option.type === 'bank' ? 'Bank Transfer' : option.type === 'ewallet' ? 'E-Wallet' : 'Send Gift'}
          </p>
          <h3 className="text-ivory font-medium">{option.title}</h3>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        {option.type !== 'address' ? (
          <>
            <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-xl">
              <div>
                <p className="text-ivory/40 text-xs">Account Name</p>
                <p className="text-ivory text-sm">{option.accountName}</p>
              </div>
            </div>
            <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-xl">
              <div>
                <p className="text-ivory/40 text-xs">
                  {option.type === 'bank' ? 'Account Number' : 'Phone Number'}
                </p>
                <p className="text-ivory text-sm font-mono">{option.accountNumber}</p>
              </div>
            </div>
            {option.bankName && (
              <div className="flex justify-between items-center py-2 px-3 bg-white/5 rounded-xl">
                <div>
                  <p className="text-ivory/40 text-xs">Bank / Provider</p>
                  <p className="text-ivory text-sm">{option.bankName}</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="py-2 px-3 bg-white/5 rounded-xl">
            <p className="text-ivory/40 text-xs mb-1">Address</p>
            <p className="text-ivory text-sm leading-relaxed">{option.address}</p>
          </div>
        )}
      </div>

      {/* Copy Button */}
      <button
        onClick={() => handleCopy(option.type !== 'address' ? option.accountNumber : option.address || '')}
        className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
          copied
            ? 'bg-green-500/20 text-green-400'
            : 'bg-gold/10 text-gold hover:bg-gold/20'
        }`}
      >
        {copied ? (
          <>
            <Check size={18} />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy size={18} />
            <span>Copy to Clipboard</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function GiftSection() {
  return (
    <section id="gift" className="px-4 py-20 bg-black">
      {/* Section Header */}
      <div className="text-center mb-12 animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
          <Gift size={28} className="text-gold" />
        </div>
        <p className="text-gold/70 text-xs uppercase tracking-[0.3em] mb-3">
          Wedding Gift
        </p>
        <h2 className="font-serif text-3xl text-ivory mb-4">
          Gift Registry
        </h2>
        <p className="text-ivory/60 text-sm max-w-xs mx-auto leading-relaxed">
          Your blessing and prayer are the greatest gifts of all. However, if you wish to honor us with a gift, you may use the options below.
        </p>
      </div>

      {/* Gift Options */}
      <div className="max-w-sm mx-auto space-y-4">
        {giftOptions.map((option, index) => (
          <GiftCard key={option.id} option={option} index={index} />
        ))}
      </div>
    </section>
  );
}
